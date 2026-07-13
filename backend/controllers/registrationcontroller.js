import User from '../models/User.js';
import Team from '../models/Team.js';
import Otp from '../models/Otp.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 1. SEND OTP ENDPOINT
export const sendOtp = async (req, res) => {
  try {
    const { email, hackathonId } = req.body;

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      if (existingUser.registeredHackathons && existingUser.registeredHackathons.includes(hackathonId)) {
        return res.status(400).json({ error: "This email is already registered for this specific hackathon." });
      }
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndUpdate(
      { email },
      { otp: otpCode, createdAt: Date.now() },
      { upsert: true, returnDocument: 'after' } 
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your Hackathon Registration',
      html: `
        <div style="font-family: sans-serif; text-align: center; padding: 20px;">
          <h2>Your Verification Code</h2>
          <p>Use the code below to complete your hackathon registration.</p>
          <h1 style="color: #00C2B2; letter-spacing: 5px;">${otpCode}</h1>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP. Please try again." });
  }
};


// 2. COMPLETE REGISTRATION ENDPOINT (Fixed 500 Error)
export const handleRegistration = async (req, res) => {
  try {
    const { userId, hackathonId, hackathonName, registrationType, personalDetails, teamDetails, otp } = req.body;

    // A: Check if the user sent a valid session ID
    if (!userId) {
      return res.status(401).json({ error: "You must be logged in to register for a hackathon." });
    }

    // B: Verify OTP
    const validOtpRecord = await Otp.findOne({ 
      email: personalDetails.email, 
      otp: otp 
    });

    if (!validOtpRecord) {
      return res.status(400).json({ error: "Invalid or expired OTP. Please request a new one." });
    }

    // C: Safely find the user (Bulletproof against CastErrors)
    let user = null;
    
    // Check if the userId provided is a valid 24-character MongoDB ObjectId
    if (userId && /^[0-9a-fA-F]{24}$/.test(userId)) {
      user = await User.findById(userId);
    }

    // Fallback: Find by the verified email if the token/ID was malformed
    if (!user) {
      user = await User.findOne({ email: personalDetails.email });
    }

    if (!user) {
      return res.status(404).json({ error: "Account not found. Please log in with the correct credentials." });
    }

    // D: Map the Enum
    let mappedParticipationType = 'NONE';
    if (registrationType === 'create') mappedParticipationType = 'LEADER';
    else if (registrationType === 'join') mappedParticipationType = 'MEMBER';
    else if (registrationType === 'solo') mappedParticipationType = 'SOLO';

    // E: Update their existing profile with the new form data
    user.fullName = personalDetails.name;
    user.email = personalDetails.email;
    user.college = personalDetails.college;
    user.course = personalDetails.course;
    user.location = personalDetails.location;
    user.participationType = mappedParticipationType;
    user.isVerified = true;
    
    if (teamDetails.skills) {
      user.skills = teamDetails.skills.split(',').map(s => s.trim());
    }

    // Add the hackathon to their profile if it's not already there
    if (!user.registeredHackathons) user.registeredHackathons = [];
    if (!user.registeredHackathons.includes(hackathonId)) {
      user.registeredHackathons.push(hackathonId);
    }

    await user.save();

    // F: Handle Team Creation or Joining
    let assignedTeamId = null;

    if (registrationType === 'create') {
      const newTeam = new Team({
        name: teamDetails.teamName,
        inviteCode: teamDetails.inviteCode,
        hackathonId: hackathonId,
        hackathonName: hackathonName,
        leader: user._id,
        members: [user._id]
      });
      await newTeam.save();
      assignedTeamId = newTeam._id;
    } 
    else if (registrationType === 'join') {
      const team = await Team.findOne({ inviteCode: teamDetails.inviteCode });
      if (!team) return res.status(404).json({ error: "Invalid Invite Code." });
      
      // Added fallback for maxSize in case the database schema defaults to undefined
      const maxTeamSize = team.maxSize || 4; 
      if (team.members.length >= maxTeamSize) {
        return res.status(400).json({ error: "This team is already full." });
      }
      
      team.members.push(user._id);
      await team.save();
      assignedTeamId = team._id;
    }

    // Push the new team ID into the user's teams array
    if (assignedTeamId) {
      if (!user.teams) user.teams = [];
      user.teams.push(assignedTeamId);
      await user.save();
    }

    // Clean up OTP
    await Otp.deleteOne({ email: personalDetails.email });

    res.status(201).json({ message: "Registration successful!", user });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Server error during registration." });
  }
};