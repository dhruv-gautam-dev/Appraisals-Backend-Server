import AppraisalForm from '../models/appraisalForm.js';
import mongoose from 'mongoose';


//@route POST /api/appraisals
 const createAppraisal = async (req, res) => {
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



export default createAppraisal;