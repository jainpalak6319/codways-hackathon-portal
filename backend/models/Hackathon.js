import mongoose from 'mongoose';

const stageSchema = new mongoose.Schema({
  title: { type: String },
  date: { type: String },
  description: { type: String }
});

const organizerSchema = new mongoose.Schema({
  name: { type: String },
  role: { type: String },
  email: { type: String }
});

const hackathonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  registrationDeadline: { type: String, required: true }, 
  
  mode: { type: String, default: 'Online' },
  location: { type: String },
  prize: { type: String },
  teamSize: { type: String },
  tags: [{ type: String }],
  
  overview: { type: String },
  objectives: [{ type: String }],
  benefits: [{ type: String }], // Enforced max 4 in frontend
  stages: [stageSchema],
  organizers: [organizerSchema],
  
  status: { type: String, default: 'Upcoming' },
  banner: { type: String, default: '🎯' },
  color: { type: String, default: '#2563EB' },
  participants: { type: Number, default: 0 },
  submissions: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Hackathon', hackathonSchema);