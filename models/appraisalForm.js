
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now }
});


const appraisalFormSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  employeeName: String,
  status: {
    type: String,
    enum: ['Draft', 'PendingManager', 'PendingSupervisor', 'PendingFeedback', 'Approved'],
    default: 'Draft'
  },
  comments: String,
  selfReview: String,
  peerFeedbacks: [feedbackSchema],
  juniorFeedbacks: [feedbackSchema],
  managerApproval: { type: Boolean, default: false },
  supervisorApproval: { type: Boolean, default: false }
}, { timestamps: true });


const AppraisalForm = mongoose.model("appraisalForm", appraisalFormSchema);

export default AppraisalForm;