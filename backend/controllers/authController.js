import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import transporter from '../config/nodemailer.js';
const generateToken = (res, user) => {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
};

//username: { type: String, required: true, unique: true },
//email: { type: String, required: true, unique: true },
//password: { type: String, required: true },
//social: {
 //   facebook: { type: String, required: false},
 ///   instagram:{ type: String, required: false },
 //   x:{ type: String, required: false },

//} ,
///bio:{type:String, required:false},
//role: { type: String, enum: ['user','seller', 'admin'], default: 'user' }
//register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (await User.findOne({ email })) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const newUser = await User.create({ name, email, password, role });
        generateToken(res, newUser);
        // Send Welcome Email
    const mailOptions = {
        from: process.env.SENDER_EMAIL || 'noreply@elitewhisper.com',
        to: email,
        subject: 'Welcome to Dynasty Soundwaves',
        text: `Dear ${name},
  
🎶 Welcome to Dynasty Soundwaves, ${name}! 🎶

You're now part of an exclusive community where the beat reigns supreme. Get ready to Ride the Wave of sound, creativity, and endless possibilities. Whether you're a producer crafting the next hit or a listener exploring powerful rhythms, you're in the right place.

Let the journey begin. Stay tuned, stay inspired, and let the dynasty grow.
  
  Kind regards,
  Dynasty Soundwaves`,
      };
      await transporter.sendMail(mailOptions);
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
// login user
export const loginUser = async(req,res) =>{
try {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user || !(await user.matchPassword(password))){
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    };
        generateToken(res, user);
        res.status(200).json({ success: true, user });
} catch (error) {
    res.status(500).json({success: false,message: 'Server Error'});
}
};

//Logout User
export const logoutUser = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.json({ success: true, message: 'Logged out' });
};

// Get User Profile (Protected)
export const getUserProfile = async (req, res) => {
    res.json({ success: true, user: req.user });
};

//  Admin Only - Get All Users
export const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.json({ success: true, users });
};

// Update User Profile
export const updateUser = async (req, res) => {
    try {
        const { name, email, password, bio, social } = req.body;
        const userId = req.params.id;

        // Check if user exists
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Ensure only the user or an admin can update the profile
        if (req.user.id !== userId && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Unauthorized action" });
        }

        // Update fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (bio) user.bio = bio;
        if (social) user.social = { ...user.social, ...social };

        // If password is changed, hash it
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete User (Self or Admin)
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // only the user or an admin can delete the profile
        if (req.user.id !== userId && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Unauthorized action" });
        }

        await User.findByIdAndDelete(userId);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};