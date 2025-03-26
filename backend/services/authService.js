import User from "../models/User.js";
import {registerUserSchemaZod} from '../validators/userValidation.js'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import transporter from '../config/nodemailer.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { generateToken } from "../utils/TokenGenerating.js";
import { STATUS_CODES } from '../constants/constants.js';
import HttpError from "../middleware/errorHandler.js";

export const serviceRegisterUser = async (userData) => {

        
    const { name, email, password, role } = userData;
    if (!userData) {
        return new  HttpError("Name, email, and password are required.",STATUS_CODES.BAD_REQUEST);
    }
        if (await User.findOne({ email })) {
            return new HttpError("User already exists",STATUS_CODES.BAD_REQUEST);
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
       
    
};

//resend otp this isa sub  method just in case 
export const serviceResendOtp = async (email) => {
   
        
        const user = await User.findOne({ email });

        if (!user) {
            return new HttpError("User not found",STATUS_CODES.NOT_FOUND);
            
        }

        if (user.isAccountVerified) {
            return new HttpError("Account already verified",STATUS_CODES.BAD_REQUEST);
        
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
            return res.status(STATUS_CODES.OK).json({ success: true, message: 'New OTP sent successfully' });
        }

       
        return new HttpError("Current OTP is still valid",STATUS_CODES.BAD_REQUEST);
};

// Verify email after registration
export const serviceVerifyEmail = async (email,otp) => {
   

    if (!email || !otp) {
        return new HttpError("Missing details:  OTP is required.",STATUS_CODES.BAD_REQUEST);
        
    }

    
        const user = await User.findOne({email});

        // Check if the user exists
        if (!user) {
            return new HttpError("User not found.",STATUS_CODES.NOT_FOUND);
        
        }

        // Check if the OTP matches and is not expired
        if (!user.verifyOtp || user.verifyOtp !== otp) {
            return new HttpError("Invalid Otp",STATUS_CODES.BAD_REQUEST);
        
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return new HttpError("OTP has expired.",STATUS_CODES.BAD_REQUEST)
         
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

        

};

// Login user with email verification check
export const serviceLoginUser = async (userData) => {

        const { email, password } = userData;
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return new HttpError("Invalid email or password",STATUS_CODES.UNAUTHORIZED);

        }

        if (!user.isAccountVerified) {
            return new HttpError("Please verify your email address.",STATUS_CODES.BAD_REQUEST);
           
        }

      
     return user;
 
};


// Update User Profile
// user from userId  from params
export const serviceUpdateUser = async (userData,userId) => {
   
        const { name, email, password, bio, social } = userData;
        

        // Check if user exists
        let user = await User.findById(userId);
        if (!user) {
            return new HttpError("User not found",STATUS_CODES.NOT_FOUND);
         
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
        let updatedUser = await User.findById(userId);
        return updatedUser;
        
    
};

// Delete User (Self or Admin)
export const serviceDeleteUser = async (id) => {

        const userId = id;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return new HttpError("User not found",STATUS_CODES.NOT_FOUND);
   
        }

        // only the user or an admin can delete the profile
        if (req.user.id !== userId && req.user.role !== "admin") {
            return new HttpError("Unauthorized action",STATUS_CODES.FORBIDDEN);
        }

        await User.findByIdAndDelete(userId);
        

};

// Forgot Password (Send OTP to email)
export const serviceForgotPassword = async (email) => {
    

    if (!email) {
        return new HttpError("Email is required.",STATUS_CODES.BAD_REQUEST);
        
    }


        const user = await User.findOne({ email });

        if (!user) {
       
            return new HttpError("User not found.",STATUS_CODES.NOT_FOUND);
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
       
};

// Reset Password using OTP
export const serviceResetPassword = async (data) => {
    const { userId, otp, newPassword } = data;

    if (!userId || !otp || !newPassword) {
        return new HttpError("User ID, OTP, and new password are required.",STATUS_CODES.BAD_REQUEST);
       
    }
        const user = await User.findById(userId);

        if (!user) {
            return new HttpError("User not found.",STATUS_CODES.NOT_FOUND);
            
        }

        // Check if OTP is valid
        if (!user.resetPasswordOtp || user.resetPasswordOtp !== otp) {
            return new HttpError("User not found.",STATUS_CODES.BAD_REQUEST);
            
        }

        if (user.resetPasswordOtpExpireAt < Date.now()) {
            return new HttpError("OTP has expired.",STATUS_CODES.BAD_REQUEST);
        
        }

        // Update password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordOtp = ''; 
        user.resetPasswordOtpExpireAt = null;
        await user.save();

       

};


