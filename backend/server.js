import dotenv from 'dotenv';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;


app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
});


dotenv.config();