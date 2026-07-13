import Hackathon from '../models/Hackathon.js';

// Get all hackathons (Used by both Admin and User Explorer)
export const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(hackathons);
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    res.status(500).json({ error: "Failed to fetch hackathons" });
  }
};

// Get a single hackathon by ID
export const getHackathonById = async (req, res) => {
  try {
    const { id } = req.params;
    const hackathon = await Hackathon.findById(id);
    
    if (!hackathon) {
      return res.status(404).json({ error: "Hackathon not found" });
    }
    
    res.status(200).json(hackathon);
  } catch (error) {
    console.error("Error fetching hackathon details:", error);
    res.status(500).json({ error: "Failed to fetch hackathon details" });
  }
};

// Create a new hackathon (Used by Admin)
export const createHackathon = async (req, res) => {
  try {
    const newHackathon = new Hackathon(req.body);
    const savedHackathon = await newHackathon.save();
    res.status(201).json(savedHackathon);
  } catch (error) {
    console.error("Error creating hackathon:", error);
    res.status(400).json({ error: "Failed to create hackathon" });
  }
};

// Update a hackathon
export const updateHackathon = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find by ID and update with the new data from req.body
    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // This ensures it returns the updated document, not the old one
    );
    
    if (!updatedHackathon) {
      return res.status(404).json({ error: "Hackathon not found to update" });
    }
    
    res.status(200).json(updatedHackathon);
  } catch (error) {
    console.error("Error updating hackathon:", error);
    res.status(500).json({ error: "Failed to update hackathon" });
  }
};

// Delete a hackathon (Used by Admin)
export const deleteHackathon = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHackathon = await Hackathon.findByIdAndDelete(id);
    
    if (!deletedHackathon) {
      return res.status(404).json({ error: "Hackathon not found" });
    }
    
    // Returning the ID matches the frontend expectations in hackathonAPI.js
    res.status(200).json({ message: "Hackathon deleted successfully", id });
  } catch (error) {
    console.error("Error deleting hackathon:", error);
    res.status(500).json({ error: "Failed to delete hackathon" });
  }
};