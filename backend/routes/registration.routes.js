import express from 'express';
import { handleRegistration } from '../controllers/registrationController.js';

const router = express.Router();

// This links the POST request from the frontend to the controller logic we wrote earlier
router.post('/register', handleRegistration);

export default router;