import express from 'express';
import {createAppraisal,managerReview, supervisorRequestFeedback, submitFeedback, finalApproval,getAppraisalsByEmployeeId} from '../controllers/appraisalControllers.js';
import auth from '../middlewares/authMiddleware.js'
import role from '../middlewares/roleMiddleware.js';

const router = express.Router();

// // after /api/appraisals all urls are going here
router.post('/',auth, role(['Employee']),createAppraisal); // /api/appraisals
router.get('/:id',auth, role(['Employee']),getAppraisalsByEmployeeId); // /api/appraisals/:id
router.put('/:id/manager',managerReview); // /api/appraisals/:id/manager
router.put('/:id/supervisor',supervisorRequestFeedback);// /api/appraisals/:id/supervisor
router.post('/:id/feedback', auth, role(['Peer', 'Junior']), submitFeedback); // /api/appraisals/:id/feedback
router.put('/:id/approve',finalApproval); // /api/appraisals/:id/approve


export default router;