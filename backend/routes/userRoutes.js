import express from 'express';
import { 
    registerUser, 
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

const router = express.Router();


router.post('/register', registerUser);


router.post('/verify-email', verifyEmail); 

router.post('/login', loginUser);


router.post('/logout', logoutUser);

// Get User Profile (Protected)
router.get('/profile', userAuth, getUserProfile);

// Update User Profile (Protected)
router.put('/update-profile/:id', userAuth, updateUser);

// Delete User Profile (Self or Admin)
router.delete('/delete-profile/:id', userAuth, deleteUser);

// Admin Only - Get All Users
router.get('/users', userAuth, rolesAuth('admin'), getAllUsers);

// Forgot Password (Send OTP to email)
router.post('/forgot-password', forgotPassword);

// Reset Password using OTP
router.post('/reset-password', resetPassword);

export default router;
