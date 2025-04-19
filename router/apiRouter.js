import express from 'express';
import authRouters from './authRoutes.js';
// import appraisalsRouter from './appraisalsRoutes.js';

const router = express.Router();


// after /api all urls are going here 
router.use("/auth",authRouters);
// router.use("/appraisals",appraisalsRouter); 

export default router;