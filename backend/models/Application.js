import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hackathonId: { type: String, required: true },
  hackathonName: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  status: {
    type: String,
    enum: ['applied', 'in_review', 'shortlisted', 'rejected'],
    default: 'applied'
  }
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);