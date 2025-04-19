// after /api/appraisals all urls are going here

import express from 'express';
const router = express.Router();

// Method     Endpoint    AccessRole                        Description
// POST       /api/appraisals             Employee                     Create self-appraisal
// PUT        /api/appraisals/:id/manager                   Manager Manager review & forward
// PUT        /api/appraisals/:id/supervisor                Supervisor Supervisor sends for feedback
// POST         /api/appraisals/:id/feedback Peer/Junior    Submit feedback
// PUT        /api/appraisals/:id/approve Manager           Final approval




router.post('/',createAppraisal);
router.get('/',getAllAppraisals);
router.get('/:id',getAppraisalById);

router.put('/:id/manager',managerReview);
router.put('/:id/supervisor',supervisorReview);
router.post('/:id/feedback',submitFeedback);
router.put('/:id/approve',finalApproval);

export default router;