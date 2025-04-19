import express from 'express';
import {registerUser} from '../controllers/authControllers.js';
const router = express.Router();

// after /api/auth all urls are going here
router.post('/register',registerUser);
// router.post('/login',loginUser);

export default router;