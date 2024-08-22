// taskRoutes.js
import express from 'express';
import { createTask, getTasksByUser } from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to create a new task (protected by authentication)
router.post('/tasks', authenticateToken, createTask);

// Route to get tasks for the authenticated user (protected by authentication)
router.get('/tasks', authenticateToken, getTasksByUser);

export default router;
