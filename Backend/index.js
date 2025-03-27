import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import userRouter from "./src/Routes/User.route.js";
import workRouter from './src/Routes/Work.route.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/work', workRouter);

mongoose.connect(process.env.url).then(() =>{
    console.log("Connected to DB");

    app.listen(process.env.port, () => {
        console.log(`Server is running on port ${process.env.port}`);

    })
}).catch((err) => {
    console.log(err);
}) 