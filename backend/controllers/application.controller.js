import '../models/Team.js';
import Application from '../models/Application.js';

// GET /api/applications/my — tracker: all applications for logged-in user
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate('team', 'name status')
      .sort({ createdAt: -1 });

    return res.status(200).json({ applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching applications" });
  }
};

// POST /api/applications — create a new application entry (called after registration)
export const createApplication = async (req, res) => {
  try {
    const { hackathonId, hackathonName, team } = req.body;

    if (!hackathonId || !hackathonName) {
      return res.status(400).json({ error: "hackathonId and hackathonName are required" });
    }

    const existing = await Application.findOne({ user: req.user._id, hackathonId });
    if (existing) {
      return res.status(400).json({ error: "You have already applied to this hackathon" });
    }

    const application = new Application({
      user: req.user._id,
      hackathonId,
      hackathonName,
      team: team || null
    });
    await application.save();

    return res.status(201).json({ message: "Application created", application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while creating application" });
  }
};

// PUT /api/applications/:id/status — admin/judge updates status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['applied', 'in_review', 'shortlisted', 'rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) return res.status(404).json({ error: "Application not found" });

    return res.status(200).json({ message: "Status updated", application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while updating status" });
  }
};