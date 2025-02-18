import mongoose from 'mongoose';

const Cart = new mongoose.Schema({
    musicIDS: { type: [String], default: [] },  
    userID: { type: String, required: true },
},{timestamps:true});

export default mongoose.model('Cart', Cart);