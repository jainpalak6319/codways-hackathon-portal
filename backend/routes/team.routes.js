import express from 'express';
import Team from '../models/Team.js';
import User from '../models/User.js';

const router = express.Router();

// ==========================================
// 1. GET ALL TEAMS FOR A USER (Used by MyTeams.jsx)
// ==========================================
router.get('/user/:userId', async (req, res) => {
  try {
    const teams = await Team.find({ members: req.params.userId })
                            // ADDED: email and college to populate list
                            .populate('members', 'fullName email college participationType skills')
                            .sort({ createdAt: -1 });

    if (!teams || teams.length === 0) {
      return res.status(200).json({ hasTeams: false, teams: [] });
    }
    
    res.status(200).json({ hasTeams: true, teams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});


// ==========================================
// 2. GET A SPECIFIC TEAM BY TEAM ID (Used by TeamWorkspace.jsx)
// ==========================================
router.get('/:teamId', async (req, res) => {
  try {
    // Find the team directly by its ID
    const team = await Team.findById(req.params.teamId)
                            // ADDED: email and college to populate list
                            .populate('members', 'fullName email college participationType skills');
    
    if (!team) {
      return res.status(404).json({ hasTeam: false, error: "Team not found" });
    }

    res.status(200).json({ hasTeam: true, team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch team details" });
  }
});

export default router;