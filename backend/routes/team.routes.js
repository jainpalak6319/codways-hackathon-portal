import express from 'express';
import Team from '../models/Team.js';
import User from '../models/User.js';

const router = express.Router();


router.get('/user/:userId', async (req, res) => {
  try {
    const teams = await Team.find({ members: req.params.userId })
                            .populate('members', 'name participationType skills')
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

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.team) {
      return res.status(200).json({ hasTeam: false }); // User has no team yet
    }

    // Find the team and "populate" the members array with actual user data (names, roles)
    const team = await Team.findById(user.team).populate('members', 'name participationType skills');
    
    res.status(200).json({ hasTeam: true, team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch team details" });
  }
});

export default router;