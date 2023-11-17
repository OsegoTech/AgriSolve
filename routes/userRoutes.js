import express from 'express';
import  { loginUser, logoutUser, refreshAccessToken } from '../controllers/userAuthController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { registerUser } from '../controllers/userAuthController.js';
import { addProfile, updateUser } from '../controllers/updateUserController.js';
import { updatePassword } from '../controllers/updatePasswordController.js';

const router = express.Router();

// Registration
router.post('/register', registerUser);

// Login and Authorization
router.post('/login', loginUser);

// Route for refreshing access tokens
router.post('/refresh-token', refreshAccessToken);

// Profile
router.post('/profile', verifyToken, addProfile);

// Update user
router.put('/update_user', verifyToken, updateUser);

// Update Password
router.put('/update_password', verifyToken, updatePassword);

// Logout
router.post('/logout', logoutUser);

export default router;
