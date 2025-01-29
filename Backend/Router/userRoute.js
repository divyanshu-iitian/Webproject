import express from 'express';  // Import Express
import { registerUser, login, logoutUser, updateProfile } from '../controllers/userController.js';  // Import controllers
import authMiddleware from '../middlewares/auth.js';  // Import authentication middleware (if any)
// import { singleUpload } from '../Middlewares/multer.js';
const router = express.Router();  // Initialize the router

// Register route
router.post('/register',registerUser);

// Login route
router.post('/login', login);

// Logout route
router.get('/logout', logoutUser);

// Profile update route (with authentication middleware)
router.post('/profile', authMiddleware, updateProfile);


export default router;
