import mongoose from 'mongoose';

const TermandCondition =  new mongoose.Schema({
    terms:  { type: String, required: true },
    conditions:  { type: String, required: true },

},{timestamps:true});

TermandCondition.pre('save', async function (next) {
    if (this.terms.length < 10) {
        throw new Error('Terms must be at least 10 characters long.');
    }

    if (this.conditions.length < 10) {
        throw new Error('Conditions must be at least 10 characters long.');
    }

    next();
});

export default mongoose.model('TermandCondition',TermandCondition);
