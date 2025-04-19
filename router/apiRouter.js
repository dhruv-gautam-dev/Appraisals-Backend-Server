// after /api all urls are going here 

import express from 'express';

const router = express.Router();
router.use("/auth",authRouters);
router.use("/appraisals",appraisalsRouter);

export default router;