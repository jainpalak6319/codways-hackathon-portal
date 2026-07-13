import express from 'express';
import { 
  getHackathons, 
  getHackathonById,
  createHackathon, 
  updateHackathon,
  deleteHackathon 
} from '../controllers/hackathonController.js';

const router = express.Router();

// GET all hackathons
router.get('/', getHackathons);

// GET a single hackathon by ID
router.get('/:id', getHackathonById);

// POST (Create) a new hackathon
router.post('/', createHackathon);

// PUT (Update) an existing hackathon by ID
router.put('/:id', updateHackathon);

// DELETE a hackathon by ID
router.delete('/:id', deleteHackathon);

export default router;