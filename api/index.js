import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

import userRouter from './routes/user.route.js'

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connnected sucessfully"))
    .catch(err => console.error("Database error: ", err));

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))

app.use('/api/user',userRouter);