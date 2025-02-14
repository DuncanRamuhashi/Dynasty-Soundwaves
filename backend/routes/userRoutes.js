import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile, getAllUsers } from '../controllers/authController.js';
import { rolesAuth } from '../middleware/rolesAuth.js';

import  userAuth  from '../middleware/userAuth.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', userAuth, getUserProfile);
router.get('/users', userAuth, rolesAuth('admin'), getAllUsers);

export default router;