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



