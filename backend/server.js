import dotenv from 'dotenv';
import express from 'express';
import db from './config/mongodb.js'
import  authRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
dotenv.config();
// Use express.json to parse incoming JSON requests, with an increased limit
app.use(express.json({ limit: '10mb' }));  // limit issues again
const PORT = process.env.PORT;                                 // remember to call the dotenv file fusek;
db();                                 

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/auth',authRoutes);


app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
});


