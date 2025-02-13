import dotenv from 'dotenv';
import express from 'express';
import db from './config/mongodb.js'
const app = express();
const PORT = process.env.PORT || 5000;

db();
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
});


dotenv.config();