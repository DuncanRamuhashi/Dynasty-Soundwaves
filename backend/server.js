import dotenv from 'dotenv';
import express from 'express';
import db from './config/mongodb.js'
import  authRoutes from './routes/userRoutes.js'
import cartRouter from './routes/cartRoutes.js';
import invoiceRouter from './routes/invoiceRoutes.js';
import musicRouter from './routes/musicRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import reportRouter from './routes/reportRoutes.js';
import TandCRouter from './routes/termsRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
dotenv.config();
// Use express.json to parse incoming JSON requests, with an increased limit
app.use(express.json({ limit: '10mb' }));  // limit issues again
const PORT = process.env.PORT;                                 // remember to call the dotenv file fusek;
db();                                 

app.use(express.json());
app.use(
  cors({
    origin: 'https://dynasty-soundwaves.vercel.app', // Allow only your frontend
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(cookieParser());

app.get("/",(req,res)=>{
res.json("Welcome to my DS Api");
});
app.use('/api/auth',authRoutes);
app.use('/api/cart',cartRouter);
app.use('/api/invoice',invoiceRouter);
app.use('/api/music',musicRouter);
app.use('/api/payment',paymentRouter);
app.use('/api/report',reportRouter);
app.use('/api/tsandcs',TandCRouter);

app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
});


