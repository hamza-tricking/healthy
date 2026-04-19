const OTP = require('../models/OTP');
const EmailService = require('../services/emailService');

class OTPController {
  /**
   * Generate 6-digit OTP
   * @returns {string} - 6-digit OTP
   */
  static generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Send OTP to user email
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async sendOTP(req, res) {
    try {
      const { email, purpose = 'email_verification' } = req.body;

      // Validate input
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      // Validate email format
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      // Generate OTP
      const otp = this.generateOTP();

      // Save OTP to database
      const otpRecord = new OTP({
        email: email.toLowerCase().trim(),
        otp,
        purpose,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      });

      await otpRecord.save();

      // Send OTP via email
      const emailSent = await EmailService.sendOTP(email, otp, purpose);

      if (!emailSent) {
        // If email fails, delete the OTP record
        await OTP.deleteOne({ _id: otpRecord._id });
        return res.status(500).json({
          success: false,
          message: 'Failed to send OTP email'
        });
      }

      res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
        data: {
          email: email.toLowerCase().trim(),
          purpose,
          expiresIn: 10 * 60 * 1000 // 10 minutes in milliseconds
        }
      });

    } catch (error) {
      console.error('Error in sendOTP:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Verify OTP
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async verifyOTP(req, res) {
    try {
      const { email, otp, purpose = 'email_verification' } = req.body;

      // Validate input
      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: 'Email and OTP are required'
        });
      }

      // Find valid OTP record
      const otpRecord = await OTP.findOne({
        email: email.toLowerCase().trim(),
        otp,
        purpose,
        isUsed: false,
        expiresAt: { $gt: new Date() }
      });

      if (!otpRecord) {
        // Update attempts if email exists
        await OTP.findOneAndUpdate(
          { email: email.toLowerCase().trim(), purpose },
          { $inc: { attempts: 1 } }
        );

        return res.status(400).json({
          success: false,
          message: 'Invalid or expired OTP'
        });
      }

      // Check attempts limit
      if (otpRecord.attempts >= 5) {
        return res.status(429).json({
          success: false,
          message: 'Too many attempts. Please request a new OTP'
        });
      }

      // Mark OTP as used
      otpRecord.isUsed = true;
      await otpRecord.save();

      res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
        data: {
          email: email.toLowerCase().trim(),
          purpose,
          verifiedAt: new Date()
        }
      });

    } catch (error) {
      console.error('Error in verifyOTP:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Resend OTP
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async resendOTP(req, res) {
    try {
      const { email, purpose = 'email_verification' } = req.body;

      // Validate input
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      // Check if there's a recent OTP (sent within last 60 seconds)
      const recentOTP = await OTP.findOne({
        email: email.toLowerCase().trim(),
        purpose,
        isUsed: false,
        createdAt: { $gt: new Date(Date.now() - 60 * 1000) }
      });

      if (recentOTP) {
        return res.status(429).json({
          success: false,
          message: 'Please wait before requesting another OTP'
        });
      }

      // Generate and send new OTP
      return this.sendOTP(req, res);

    } catch (error) {
      console.error('Error in resendOTP:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Clean up expired OTPs (utility method)
   */
  static async cleanupExpiredOTPs() {
    try {
      const result = await OTP.deleteMany({
        expiresAt: { $lt: new Date() }
      });
      console.log(`Cleaned up ${result.deletedCount} expired OTPs`);
    } catch (error) {
      console.error('Error cleaning up expired OTPs:', error);
    }
  }
}

module.exports = OTPController;
