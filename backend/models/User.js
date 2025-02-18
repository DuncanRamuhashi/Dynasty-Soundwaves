import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    social: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        x: { type: String, default: '' },
    },
    bio: { type: String, trim: true, maxlength: 500 },
    role: { type: String, enum: ['user','seller', 'admin'], default: 'user' },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Number, default: 0 }, 
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 }, 
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hide password in responses
UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model('User', UserSchema);
