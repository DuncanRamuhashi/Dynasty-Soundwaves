import User from "../models/User.js";
import {registerUserSchemaZod} from '../validators/userValidation.js'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import asyncHandler from 'express-async-handler';
import transporter from '../config/nodemailer.js';

import { generateToken } from "../utils/TokenGenerating.js";
import { STATUS_CODES } from '../constants/constants.js';
import { serviceDeleteUser, serviceForgotPassword, serviceLoginUser, serviceRegisterUser, serviceResendOtp, serviceResetPassword, serviceUpdateUser, serviceVerifyEmail } from "../services/authService.js";

export const registerUser =  asyncHandler (async (req, res) => {
 
    await serviceRegisterUser(req.body);

        res.status(STATUS_CODES.CREATED).json({ success: true, message: 'User registered successfully. Please verify your email.' });
 
});

//resend otp this isa sub  method just in case 
export const resendOtp =asyncHandler( async (req, res) => {
   
        const { email } = req.body;
        await   serviceResendOtp(email);

});

// Verify email after registration
export const verifyEmail =asyncHandler( async (req, res) => {
    const { email, otp } = req.body;
    await  serviceVerifyEmail(email,otp);
});

// Login user with email verification check
export const loginUser =asyncHandler( async (req, res) => {
    
        
        const user =await serviceLoginUser(req.body);
        console.log(user);
        const token =await  generateToken(res, user);
     res.status(STATUS_CODES.OK).json({ 
         success: true, 
         user: { user },
         token // Include the token in the response body
     });   
});
// Logout User
export const logoutUser = asyncHandler( (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.json({ success: true, message: 'Logged out' });
});

// Get User Profile (Protected)  (for normal user to see the profile of Seller maybe some fan things)
export const getUserProfile =asyncHandler( async (req, res) => {
    res.json({ success: true, user: req.user });
});

// Admin Only - Get All Users
export const getAllUsers =asyncHandler( async (req, res) => {
    const users = await User.find({});
    res.json({ success: true, users });
});

// Update User Profile
export const updateUser =asyncHandler( async (req, res) => {
 
        
        const userId = req.params.id;

        // Check if user exists
        let user =await serviceUpdateUser(req.body,userId);
        res.status(STATUS_CODES.OK).json({ success: true, message: "User updated successfully", user });
 
});

// Delete User (Self or Admin)
export const deleteUser =asyncHandler( async (req, res) => {
 
        const userId = req.params.id;
        await    serviceDeleteUser(userId) ;
      
        res.status(STATUS_CODES.OK).json({ success: true, message: "User deleted successfully" });
   
});

// Forgot Password (Send OTP to email)
export const forgotPassword =asyncHandler( async (req, res) => {
    const { email } = req.body;
    await serviceForgotPassword(email);

res.status(STATUS_CODES.OK).json({ success: true, message: 'OTP sent to your email for password reset.' });
 
});

// Reset Password using OTP
export const resetPassword =asyncHandler( async (req, res) => {
    await    serviceResetPassword(req.body);

res.status(STATUS_CODES.OK).json({ success: true, message: 'Password reset successfully.' });
   
});


