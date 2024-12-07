import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const salt = bcryptjs.genSaltSync(10)
    const hashedPassword = bcryptjs.hashSync(password, salt)
    const newUser = new User({ username, email, password: hashedPassword, salt })
    try {
        await newUser.save()
        return res.status(201).json('User created successfully')
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User not found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_KEY)
        const { password: pass, salt, ...rest } = validUser._doc
        res
            .cookie('access_token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60)
            })
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
}
