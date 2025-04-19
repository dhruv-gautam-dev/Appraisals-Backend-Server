import AppraisalForm from '../models/appraisalForm.js';
import mongoose from 'mongoose';

// Employee creates a self appraisal form
//@route POST /api/appraisals
export const createAppraisal = async (req, res) => {
  const { communication, teamwork, problemSolving, workQuality, comments } = req.body;

  try {
    const newAppraisal = new AppraisalForm({
      employee: req.user._id,
      communication,
      teamwork,
      problemSolving,
      workQuality,
      comments,
    });

    const saved = await newAppraisal.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appraisal', error: error.message });
  }
};


// Get all appraisals by employee ID
// @route GET /api/appraisals/employee/:id
export const getAppraisalsByEmployeeId = async (req, res) => {
  try {
    const employeeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }

    const appraisals = await AppraisalForm.find({ employee: employeeId });

    if (!appraisals || appraisals.length === 0) {
      return res.status(404).json({ message: 'No appraisals found for this employee' });
    }

    res.json(appraisals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appraisals', error: error.message });
  }
};



//manager review the appraisal form
// @route PUT /api/appraisals/:id/manager
export const managerReview = async (req, res) => {
  try {
    const appraisal = await AppraisalForm.findById(req.params.id);
    if (!appraisal) {
      return res.status(404).json({ message: 'Appraisal not found' });
    }
    appraisal.status = 'pending Supervisor review';
    appraisal.managerReview= true;
    res.json({ message: 'Appraisal reviewed by manager and forwarded to supervisor',  });
  } catch (error) {
    res.status(500).json({ message: 'Error reviewing appraisal', error: error.message });
    
  }
}


// Supervisor requests feedback from peers and juniors
// @route PUT /api/appraisals/:id/supervisor
export const supervisorRequestFeedback = async (req, res) => {
  try {
    const appraisal = await AppraisalForm.findById(req.params.id);
    if (!appraisal) return res.status(404).json({ message: 'Appraisal not found' });

    appraisal.status = 'PendingFeedback';
    appraisal.supervisorApproval = true;
    await appraisal.save();

    res.json({ message: 'Feedback request sent to peers and juniors' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// feedback submission by peers and juniors
//
export const submitFeedback = async (req, res) => {
  const { comment, rating } = req.body;
  const userRole = req.user.role;

  try {
    const appraisal = await AppraisalForm.findById(req.params.id);
    if (!appraisal) return res.status(404).json({ message: 'Appraisal not found' });

    const feedback = {
      reviewerId: req.user._id,
      comment,
      rating,
      createdAt: new Date()
    };

    if (userRole === 'Peer') {
      appraisal.peerFeedbacks.push(feedback);
    } else if (userRole === 'Junior') {
      appraisal.juniorFeedbacks.push(feedback);
    } else {
      return res.status(403).json({ message: 'Only peers or juniors can submit feedback' });
    }

    await appraisal.save();
    res.json({ message: 'Feedback submitted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const finalApproval = async (req, res) => {
  try {
    const appraisal = await AppraisalForm.findById(req.params.id);
    if (!appraisal) return res.status(404).json({ message: 'Appraisal not found' });

    appraisal.status = 'Approved';
    await appraisal.save();

    res.json({ message: 'Appraisal approved by Manager' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

