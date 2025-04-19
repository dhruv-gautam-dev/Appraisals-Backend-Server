import express from 'express';
import createAppraisal from '../controllers/appraisalControllers.js';
import auth from '../middlewares/authMiddleware.js'
import role from '../middlewares/roleMiddleware.js';

const router = express.Router();

// // after /api/appraisals all urls are going here
router.post('/',auth, role(['Employee']),createAppraisal);
// router.get('/',getAllAppraisals);
// router.get('/:id',getAppraisalById);

// router.put('/:id/manager',managerReview);
// router.put('/:id/supervisor',supervisorReview);
// router.post('/:id/feedback',submitFeedback);
// router.put('/:id/approve',finalApproval);


// router.get('/', auth, role(['Employee']), getMyAppraisals);

// router.put('/:id/manager', auth, role(['Manager']), managerReview);
// router.put('/:id/supervisor', auth, role(['Supervisor']), supervisorRequestFeedback);
// router.post('/:id/feedback', auth, role(['Peer', 'Junior']), submitFeedback);
// router.put('/:id/approve', auth, role(['Manager']), finalApproval);

export default router;