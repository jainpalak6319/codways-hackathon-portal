import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { getMyApplications, createApplication, updateApplicationStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.get('/my', protect, getMyApplications);
router.post('/', protect, createApplication);
router.put('/:id/status', protect, updateApplicationStatus);

export default router;