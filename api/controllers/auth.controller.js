import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const newUser = new User({ username, email, password: hashedPassword, salt });
    try {
        await newUser.save();
        return res.status(201).json('User created successfully');
    } catch (error) {
        next(error);
    }
};
