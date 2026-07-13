import express from 'express';
import { handleRegistration, sendOtp } from '../controllers/registrationController.js';

const router = express.Router();

router.post('/send-otp', sendOtp);       // NEW: Endpoint to trigger the email
router.post('/register', handleRegistration); // UPDATED: Now expects 'otp' in the payload

export default router;