import mongoose from 'mongoose';

const MusicSchema = new mongoose.Schema({
    title: { type: String, required: true },  
    duration: { type: Number, required: true },
    genre: { type: String, required: true },
    bpm: { type: Number, required: true },
    mood: { type: String, required: true },
    price: { type: Number, required: true },  
    audio: { type: String, required: true },  
    sellerID: { type: String, required: true },
    tags: { type: [String], default: [] },  // Allows up to 5 tags
    image: { type: String, required: true }
}, { timestamps: true });

MusicSchema.pre('save', async function(next) {
    if (this.duration <= 0) {
        throw new Error('Duration must be a positive number');
    }

    if (this.bpm <= 0) {
        throw new Error('BPM must be a positive number');
    }

    next();
});


export default mongoose.model('Music', MusicSchema);