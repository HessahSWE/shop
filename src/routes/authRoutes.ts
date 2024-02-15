// Importing controller functions for user authentication
import { loginUser, registerUser } from '../controllers/authController';

// Importing express module
import express from 'express';
const router = express.Router();

// Define routes for user registration and login
router.post('/register', registerUser); // Route to handle user registration
router.post('/login', loginUser); // Route to handle user login

// Exporting the router
export default router;
