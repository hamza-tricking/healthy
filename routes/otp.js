const express = require('express');
const router = express.Router();
const OTPController = require('../controllers/otpController');

/**
 * POST /api/otp/send
 * Send OTP to user email
 * Body: { email, purpose? }
 */
router.post('/send', OTPController.sendOTP);

/**
 * POST /api/otp/verify
 * Verify OTP
 * Body: { email, otp, purpose? }
 */
router.post('/verify', OTPController.verifyOTP);

/**
 * POST /api/otp/resend
 * Resend OTP to user email
 * Body: { email, purpose? }
 */
router.post('/resend', OTPController.resendOTP);

module.exports = router;
