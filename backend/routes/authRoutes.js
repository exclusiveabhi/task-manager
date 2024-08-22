// authRoutes.js
import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

// Route for user login
router.post('/signin', login);

// Route for user logout (you might need to implement this in the controller)
// router.post('/logout', (req, res) => {
//   res.status(200).json({ message: 'User logged out' });
// });

// Route for user registration
router.post('/signup', register);

export default router;
