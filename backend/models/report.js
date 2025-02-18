import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
    userID: { type: String, required: true}, 
    totalrevenue: { type: Number, required: true },  
   
},{timestamps: true});

ReportSchema.pre('save', async function(next) {
    if (this.totalrevenue < 0) {
        return next(new Error('Total revenue must be a positive number'));
    }
    next();
});


export default mongoose.model('Report', ReportSchema);