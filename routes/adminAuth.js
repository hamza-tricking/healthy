const express = require('express');
const router = express.Router();
const AdminAuthController = require('../controllers/adminAuthController');

/**
 * POST /api/admin-auth/login
 * Admin login
 * Body: { username, password }
 */
router.post('/login', (req, res) => {
  console.log('📍 Route /login hit');
  console.log('Method:', req.method);
  console.log('URL:', req.originalUrl);
  AdminAuthController.login(req, res);
});

/**
 * POST /api/admin-auth/send-reset-otp
 * Send password reset OTP
 * Body: { email }
 */
router.post('/send-reset-otp', (req, res) => {
  console.log('📍 Route /send-reset-otp hit');
  console.log('Method:', req.method);
  console.log('URL:', req.originalUrl);
  AdminAuthController.sendPasswordResetOTP(req, res);
});

/**
 * POST /api/admin-auth/reset-password
 * Reset password with OTP
 * Body: { email, otp, newPassword }
 */
router.post('/reset-password', AdminAuthController.resetPassword);

/**
 * POST /api/admin-auth/create-admin
 * Create initial admin (for setup)
 * Body: { username, email, password }
 */
router.post('/create-admin', AdminAuthController.createInitialAdmin);

/**
 * GET /api/admin-auth/admins
 * Get all admins (for management)
 */
router.get('/admins', AdminAuthController.getAdmins);

module.exports = router;
