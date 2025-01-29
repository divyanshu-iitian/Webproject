import express from 'express';  // Import Express
import authMiddleware from '../middlewares/auth.js';  // Import authentication middleware (if any)
import {fetchEvents, createEvent, editEvent, deleteEvent} from '../controllers/eventController.js'

const router = express.Router();  // Initialize the router

// Get posts
router.get('/', fetchEvents);

// Create
router.post('/add', authMiddleware, createEvent);

// Edit
router.post('/edit', authMiddleware, editEvent);

// Delete 
router.post('/delete', authMiddleware, deleteEvent);

export default router;
