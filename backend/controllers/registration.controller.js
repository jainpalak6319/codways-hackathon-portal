import User from '../models/User.js';
import Team from '../models/Team.js';
import crypto from 'crypto';

export const handleRegistration = async (req, res) => {
  try {
    // 1. Extract hackathonName from req.body
    const { registrationType, personalDetails, teamDetails, hackathonId, hackathonName } = req.body;

    // 2. First, create or find the User
    let user = await User.findOne({ email: personalDetails.email });
    if (!user) {
      user = new User({
        name: personalDetails.name,
        email: personalDetails.email,
        college: personalDetails.college,
        participationType: registrationType === 'create' ? 'LEADER' : registrationType === 'join' ? 'MEMBER' : 'SOLO',
        skills: teamDetails.skills ? teamDetails.skills.split(',').map(s => s.trim()) : []
      });
      await user.save();
    }

    // 3. Handle the specific path
    if (registrationType === 'create') {
      // PATH A: Create New Team
      const inviteCode = crypto.randomBytes(4).toString('hex').toUpperCase(); // Generates e.g., "8F92A1B3"
      
      const newTeam = new Team({
        name: teamDetails.teamName,
        inviteCode: inviteCode,
        hackathonId: hackathonId,
        hackathonName: hackathonName || "Hackforge 3.0", // <-- ADDED: Saves the real name (with a fallback)
        leader: user._id,
        members: [user._id]
      });
      await newTeam.save();

      // Update user with team ID
      user.team = newTeam._id;
      await user.save();

      return res.status(201).json({ message: "Team created successfully", team: newTeam, user });
    } 
    
    else if (registrationType === 'join') {
      // PATH B: Join Existing Team
      const team = await Team.findOne({ inviteCode: teamDetails.inviteCode });
      
      if (!team) return res.status(404).json({ error: "Invalid Invite Code" });
      if (team.members.length >= team.maxSize) return res.status(400).json({ error: "Team is already full" });
      if (team.members.includes(user._id)) return res.status(400).json({ error: "You are already in this team" });

      team.members.push(user._id);
      if (team.members.length === team.maxSize) team.status = 'Complete';
      await team.save();

      user.team = team._id;
      await user.save();

      return res.status(200).json({ message: "Joined team successfully", team, user });
    } 
    
    else if (registrationType === 'solo') {
      // PATH C: Solo / Matchmaking
      return res.status(200).json({ message: "Registered for matchmaking", user });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during registration" });
  }
};