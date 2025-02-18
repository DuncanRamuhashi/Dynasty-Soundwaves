import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    paymentID: { type: String, required: true }, 
    userID: { type: String, required: true }, 
    fullamount: { type: Number, required: true },  
    status: { type: String, required: true }, 
},{timestamps: true});

InvoiceSchema.pre('save', async function(next) {
    if (![ 'paid', 'failed'].includes(this.status)) {
        return next(new Error('Invalid payment status'));
    }
    next();
});


export default mongoose.model('Payment',InvoiceSchema);