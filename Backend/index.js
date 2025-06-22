// server.js
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
import router from './Router/router.js';
app.use(express.urlencoded({ extended: true }));

import { Router } from 'express';
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
// const corsOptions = {
//   origin: 'https://fooddonationwebapplication.vercel.app',
//   credentials: true,
// };
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/",router)
const jwtMiddleware = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
 
  if (!token) 
    return res.status(401).send("fail");
  try {
    
    const decoded = jwt.verify(token, "divyansh");
   console.log(decoded)
    req.user = decoded;
   
    next();
  } catch (error) {
   
    res.send("fail");
  }
};



mongoose.connect("mongodb://localhost:27017/hacronyx")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error", err));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
