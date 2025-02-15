import dotenv from 'dotenv';
import express from 'express';
import db from './config/mongodb.js'
import  authRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
const PORT = process.env.PORT;
console.log(process.env.SMTP_USER);
console.log(process.env.SMTP_PASS);                                  // remember to call the dotenv file fusek;
db();                                 

app.use(express.json());
//app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use('/api/auth',authRoutes);


app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
});


