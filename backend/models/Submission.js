import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  hackathonId: { type: String, required: true },
  hackathonName: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  projectName: { type: String, required: true },
  tagline: { type: String },
  problem: { type: String, required: true },
  solution: { type: String, required: true },
  techStack: { type: String, required: true },

  frontendRepo: { type: String, required: true },
  backendRepo: { type: String },
  liveUrl: { type: String },
  videoLink: { type: String },

  adminStatus: {
    type: String,
    enum: ['pending', 'selected', 'rejected'],
    default: 'pending'
  },
  feedback: { type: String, default: null },
  round: { type: String, default: 'Final Submission' }
}, { timestamps: true });

export default mongoose.model('Submission', submissionSchema);