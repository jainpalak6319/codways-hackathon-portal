import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { submitProject, getActiveSubmission, getSubmissionHistory } from '../controllers/submission.controller.js';

const router = express.Router();

router.get('/active', protect, getActiveSubmission);
router.get('/history', protect, getSubmissionHistory);
router.post('/', protect, submitProject);

export default router;