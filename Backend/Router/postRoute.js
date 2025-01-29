import express from 'express';  // Import Express
import authMiddleware from '../middlewares/auth.js';  // Import authentication middleware (if any)
import {fetchPosts, createPost, editPost, deletePost} from '../controllers/postController.js'

const router = express.Router();  // Initialize the router

// Get posts
router.get('/', fetchPosts);

// Create
router.post('/add', authMiddleware, createPost);

// Edit
router.post('/edit', authMiddleware, editPost);

// Delete 
router.post('/delete', authMiddleware, deletePost);

export default router;
