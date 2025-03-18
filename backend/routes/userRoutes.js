import express from 'express';
import { 
    registerUser, 
    resendOtp,
    loginUser, 
    logoutUser, 
    getUserProfile, 
    getAllUsers, 
    verifyEmail, 
    forgotPassword, 
    resetPassword, 
    updateUser, 
    deleteUser 
} from '../controllers/authController.js';
import { rolesAuth } from '../middleware/rolesAuth.js';
import userAuth from '../middleware/userAuth.js';
import validate from '../middleware/validateMiddleware.js';
import { loginUserSchemaZod,registerUserSchemaZod } from '../validators/userValidation.js';
const router = express.Router();


router.post('/register',validate(registerUserSchemaZod), registerUser);

//Sub Method 
router.post('/resend-otp',resendOtp)
router.post('/verify-email', verifyEmail); 

router.post('/login',validate(loginUserSchemaZod), loginUser);


router.post('/logout', logoutUser);

// Get User Profile (Protected)
router.get('/profile', userAuth, getUserProfile);

// Update User Profile (Protected)
router.put('/update-profile/:id', userAuth, updateUser);

// Delete User Profile (Self or Admin)
router.delete('/delete-profile/:id', userAuth, deleteUser);

// Admin Only - Get All Users
router.get('/users/:token', userAuth, rolesAuth('admin'), getAllUsers);

// Forgot Password (Send OTP to email)
router.post('/forgot-password', forgotPassword);

// Reset Password using OTP
router.post('/reset-password', resetPassword);

export default router;
