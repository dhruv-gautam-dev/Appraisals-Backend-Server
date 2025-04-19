import mongoose from "mongoose";

const Feedback = new mongoose.Schema(
  {
    reviewerId: ObjectId,
    comment: String,
    rating: Number,
    createdAt: Date
    }
    ,{timestamps: true}    
)


const appraisalFormSchema = new mongoose.Schema(
  {
    _id: ObjectId,
    employeeId: ObjectId,

    status: Enum("Draft", "PendingManager", "PendingSupervisor",
    "PendingFeedback", "Approved"),

    selfReview: String,
    peerFeedbacks: [Feedback],
    juniorFeedbacks: [Feedback],
    managerApproval: Boolean,
    supervisorApproval: Boolean,
    createdAt: Date,
    updatedAt: Date
    },{timestamps: true}
    
);
const appraisalForm = mongoose.model("appraisalForm", appraisalFormSchema);

export default appraisalForm;