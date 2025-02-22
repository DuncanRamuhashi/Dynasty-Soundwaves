import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    userID: { type: String, required: true }, 
    sellerID: { type: String, required: true }, 
    fullamount: { type: Number, required: true },  
    status: { type: String, required: true }, 
},{timestamps: true});

PaymentSchema.pre('save', async function(next) {
    if (!['paid', 'failed'].includes(this.status)) {
        return next(new Error('Invalid payment status'));
    }
    if (this.fullamount <= 0) {
        return next(new Error('Amount must be greater than zero'));
    }
    next();
});


export default mongoose.model('Instalment', PaymentSchema);