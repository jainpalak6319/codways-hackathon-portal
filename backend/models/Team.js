// import mongoose from 'mongoose';
// const teamSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   inviteCode: { type: String, required: true, unique: true },
//   hackathonId: { type: String, required: true }, // Links to the specific hackathon
//   leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   maxSize: { type: Number, default: 4 },
//   status: { type: String, enum: ['Forming', 'Complete'], default: 'Forming' }
// }, { timestamps: true });

// export default mongoose.model('Team', teamSchema);

import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  inviteCode: { type: String, required: true, unique: true },
  
  hackathonId: { type: String, required: true }, // e.g., "hackforge-3"
  hackathonName: { type: String, required: true }, // <-- NEW: e.g., "Hackforge 3.0"
  
  leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxSize: { type: Number, default: 4 },
  status: { type: String, enum: ['Forming', 'Complete'], default: 'Forming' }
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);