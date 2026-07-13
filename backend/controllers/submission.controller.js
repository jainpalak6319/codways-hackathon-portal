import Submission from '../models/Submission.js';
import Team from '../models/Team.js';

// GET /api/submissions/active — the team's current editable submission (or null)
export const getActiveSubmission = async (req, res) => {
  try {
    const team = await Team.findOne({ members: req.user._id }).sort({ createdAt: -1 });

    if (!team) {
      return res.status(200).json({ hasActiveTask: false, submission: null, team: null });
    }

    let submission = await Submission.findOne({
      team: team._id,
      adminStatus: 'pending'
    });

    return res.status(200).json({
      hasActiveTask: true,
      team,
      submission: submission || null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching active submission" });
  }
};

// GET /api/submissions/history — past graded submissions for this user
export const getSubmissionHistory = async (req, res) => {
  try {
    const submissions = await Submission.find({
      submittedBy: req.user._id,
      adminStatus: { $in: ['selected', 'rejected'] }
    }).sort({ createdAt: -1 });

    return res.status(200).json({ submissions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching submission history" });
  }
};

// POST /api/submissions — create or update the active submission
export const submitProject = async (req, res) => {
  try {
    const {
      hackathonId, hackathonName, team,
      projectName, tagline, problem, solution, techStack,
      frontendRepo, backendRepo, liveUrl, videoLink
    } = req.body;

    if (!hackathonId || !hackathonName || !team || !projectName || !problem || !solution || !techStack || !frontendRepo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let submission = await Submission.findOne({ team, hackathonId });

    if (submission) {
      if (submission.adminStatus !== 'pending') {
        return res.status(400).json({ error: "This submission has already been graded and cannot be edited" });
      }
      Object.assign(submission, {
        projectName, tagline, problem, solution, techStack,
        frontendRepo, backendRepo, liveUrl, videoLink,
        submittedBy: req.user._id
      });
      await submission.save();
      return res.status(200).json({ message: "Submission updated", submission });
    }

    submission = new Submission({
      hackathonId, hackathonName, team,
      submittedBy: req.user._id,
      projectName, tagline, problem, solution, techStack,
      frontendRepo, backendRepo, liveUrl, videoLink
    });
    await submission.save();

    return res.status(201).json({ message: "Submission created", submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while submitting project" });
  }
};