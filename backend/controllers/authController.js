import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import transporter from '../config/nodemailer.js';

const generateToken = (res, user) => {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', // Adjust based on environment
        sameSite: 'strict',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return token; // Return the token for further use
};

// Register user with email verification
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
          // Validate required fields
    if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }
        if (await User.findOne({ email })) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const newUser = await User.create({ name, email, password, role, isAccountVerified: false });

        // Generate OTP for email verification
        const otp = crypto.randomInt(100000, 999999).toString();
        newUser.verifyOtp = otp;
        newUser.verifyOtpExpireAt = Date.now() + 4 * 60 * 1000; // OTP expires in 4 minutes
        await newUser.save();

        // Send OTP email for verification
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Account Verification OTP',
            text: `Hi ${name},

Your OTP for verifying your Dynasty Soundwave account is: ${otp}

Please use this OTP to verify your account within 4 minutes.

If you did not request this, please disregard this email.

Best regards,
The Dynasty Soundwave Team`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: 'User registered successfully. Please verify your email.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

//resend otp this isa sub  method just in case 
export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: 'Account already verified' });
        }

        // Check if OTP has expired
        if ((Date.now() + 4 * 60 * 1000) > user.verifyOtpExpireAt) {
            const newOtp = crypto.randomInt(100000, 999999).toString();
            user.verifyOtp = newOtp;
            user.verifyOtpExpireAt = Date.now() + 4 * 60 * 1000; // New OTP expires in 4 minutes
            await user.save();

             // Send OTP email for verification
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Hi ${user.name},

Your OTP for verifying your Dynasty Soundwave account  again: ${user.verifyOtp }

Please use this OTP to verify your account within 4 minutes.

If you did not request this, please disregard this email.

Best regards,
The Dynasty Soundwave Team`,
        };

        await transporter.sendMail(mailOptions);
            return res.status(200).json({ success: true, message: 'New OTP sent successfully' });
        }

        res.status(400).json({ success: false, message: 'Current OTP is still valid' });
    } catch (error) {
        console.error('Error during OTP resend:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Verify email after registration
export const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Missing details:  OTP is required.' });
    }

    try {
        const user = await User.findOne({email});

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Check if the OTP matches and is not expired
        if (!user.verifyOtp || user.verifyOtp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP.' });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP has expired.' });
        }

        // Mark account as verified
        user.isAccountVerified = true;
        user.verifyOtp = ''; // Clear OTP
        user.verifyOtpExpireAt = null; // Clear expiry time
         // Send Welcome Email

const mailOptions = {

 from: process.env.SENDER_EMAIL,
  to: user.email,
  subject: 'Welcome to Dynasty Soundwaves',
 text: `Dear ${user.name},
      
    🎶 Welcome to Dynasty Soundwaves, ${user.name}! 🎶
        
    You're now part of an exclusive community where the beat reigns supreme. Get ready to Ride the Wave of sound, creativity, and endless possibilities. Whether you're a producer crafting the next hit or a listener exploring powerful rhythms, you're in the right place.
      
    Let the journey begin. Stay tuned, stay inspired, and let the dynasty grow.
     
    Kind regards,

    Dynasty Soundwaves`, 
    };
     await transporter.sendMail(mailOptions);
        await user.save();

        // Send JWT token after email verification
        generateToken(res, user);

        return res.status(200).json({ success: true, message: 'Email verified successfully.' });
    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
};

// Login user with email verification check
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        if (!user.isAccountVerified) {
            return res.status(400).json({ success: false, message: 'Please verify your email address.' });
        }

        const token = generateToken(res, user);
     res.status(200).json({ 
         success: true, 
         user: { user },
         token // Include the token in the response body
     });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Logout User
export const logoutUser = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.json({ success: true, message: 'Logged out' });
};

// Get User Profile (Protected)  (for normal user to see the profile of Seller maybe some fan things)
export const getUserProfile = async (req, res) => {
    res.json({ success: true, user: req.user });
};

// Admin Only - Get All Users
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
            user.password = password;
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

// Forgot Password (Send OTP to email)
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Generate OTP for password reset
        const otp = crypto.randomInt(100000, 999999).toString();
        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpireAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
        await user.save();

        // Send OTP email for password reset
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Hi ${user.name},

Your OTP for resetting your password is: ${otp}

Please use this OTP to reset your password within 10 minutes.

If you did not request this, please disregard this email.

Best regards,
The Dynasty Soundwave Team`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'OTP sent to your email for password reset.' });
    } catch (error) {
        console.error("Error sending OTP:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Reset Password using OTP
export const resetPassword = async (req, res) => {
    const { userId, otp, newPassword } = req.body;

    if (!userId || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: "User ID, OTP, and new password are required." });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if OTP is valid
        if (!user.resetPasswordOtp || user.resetPasswordOtp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP.' });
        }

        if (user.resetPasswordOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP has expired.' });
        }

        // Update password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordOtp = ''; 
        user.resetPasswordOtpExpireAt = null;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully.' });
    } catch (error) {
        console.error("Error resetting password:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


