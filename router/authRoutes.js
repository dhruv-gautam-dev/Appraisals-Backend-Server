import express from 'express';
import {registerUser, loginUser} from '../controllers/authControllers.js';
const router = express.Router();

// after /api/auth all urls are going here
router.post('/register',registerUser); //api/auth/register
router.post('/login',loginUser); //api/auth/login

export default router;