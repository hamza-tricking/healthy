const Admin = require('../models/Admin');
const OTPController = require('./otpController');

class AdminAuthController {
  /**
   * Admin login
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async login(req, res) {
    try {
      console.log('🔍 login called');
      console.log('Request body:', req.body);
      console.log('Request URL:', req.originalUrl);
      
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required'
        });
      }

      // Find admin by username or email
      console.log('🔍 Looking for admin with:', username.toLowerCase().trim());
      const admin = await Admin.findOne({
        $or: [
          { username: username.toLowerCase().trim() },
          { email: username.toLowerCase().trim() }
        ],
        isActive: true
      });

      if (!admin) {
        console.log('❌ Admin not found');
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      console.log('✅ Admin found:', admin.email);
      console.log('🔍 Comparing password...');
      
      // Check password
      const isPasswordValid = await admin.comparePassword(password);
      console.log('🔍 Password valid:', isPasswordValid);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Update last login
      admin.lastLogin = new Date();
      await admin.save();

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin
        }
      });

    } catch (error) {
      console.error('Error in admin login:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Send password reset OTP
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async sendPasswordResetOTP(req, res) {
    try {
      console.log('🔍 sendPasswordResetOTP called');
      console.log('Request body:', req.body);
      console.log('Request URL:', req.originalUrl);
      
      const { email } = req.body;

      // Validate input
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      // Check if email exists in admin database
      console.log('🔍 Looking for admin with email:', email.toLowerCase().trim());
      const admin = await Admin.findOne({
        email: email.toLowerCase().trim(),
        isActive: true
      });
      
      console.log('🔍 Found admin:', admin ? admin.email : 'None');

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'Email not found in our system'
        });
      }

      // Send OTP using the existing OTP controller
      // Note: OTPController.sendOTP handles the response
      await OTPController.sendOTP({
        body: {
          email: email.toLowerCase().trim(),
          purpose: 'password_reset'
        }
      }, res);

    } catch (error) {
      console.error('Error in sendPasswordResetOTP:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Reset password with OTP
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async resetPassword(req, res) {
    try {
      const { email, otp, newPassword } = req.body;

      // Validate input
      if (!email || !otp || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Email, OTP, and new password are required'
        });
      }

      // Validate password strength
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }

      // First verify the OTP
      console.log('🔍 Starting OTP verification for:', email.toLowerCase().trim());
      console.log('🔍 OTP code provided:', otp);
      
      // Create a mock response object for OTP verification
      const mockRes = {
        status: (code) => ({
          json: (data) => ({ success: data.success, data: data.data })
        })
      };
      
      const verifyResponse = await OTPController.verifyOTP({
        body: {
          email: email.toLowerCase().trim(),
          otp: otp,
          purpose: 'password_reset'
        }
      }, mockRes);
      
      console.log('🔍 OTP verification response:', verifyResponse);

      // If OTP is valid (check if verifyOTP sent success response)
      if (verifyResponse.success) {
        console.log('✅ OTP verified successfully');
      } else {
        console.log('❌ OTP verification failed');
        
        // Check if there's a newer OTP available
        const OTP = require('../models/OTP');
        const latestOTP = await OTP.findOne({
          email: email.toLowerCase().trim(),
          purpose: 'password_reset'
        }).sort({ createdAt: -1 });
        
        if (latestOTP && latestOTP.otp !== otp) {
          return res.status(400).json({
            success: false,
            message: `Invalid reset code. A new code was sent. Please use the latest code: ${latestOTP.otp}`,
            requiresNewOTP: false,
            latestOTP: latestOTP.otp
          });
        } else if (latestOTP && latestOTP.isUsed) {
          return res.status(400).json({
            success: false,
            message: 'This reset code has already been used. Please request a new one.',
            requiresNewOTP: true
          });
        } else if (latestOTP && new Date() > latestOTP.expiresAt) {
          return res.status(400).json({
            success: false,
            message: 'This reset code has expired. Please request a new one.',
            requiresNewOTP: true
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Invalid reset code. Please check and try again.',
            requiresNewOTP: false
          });
        }
      }

      // Find admin and update password
      const admin = await Admin.findOne({
        email: email.toLowerCase().trim(),
        isActive: true
      });

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'Admin not found'
        });
      }

      // Hash new password before updating
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      admin.password = hashedPassword;
      await admin.save();

      // Mark OTP as used
      otpRecord.isUsed = true;
      await otpRecord.save();

      res.status(200).json({
        success: true,
        message: 'Password reset successful. You can now login with your new password.'
      });

    } catch (error) {
      console.error('Error in resetPassword:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Create initial admin (for setup)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async createInitialAdmin(req, res) {
    try {
      const { username, email, password } = req.body;

      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username, email, and password are required'
        });
      }

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({
        $or: [
          { username: username.toLowerCase().trim() },
          { email: email.toLowerCase().trim() }
        ]
      });

      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: 'Admin with this username or email already exists'
        });
      }

      // Hash password before creating admin
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new admin
      const admin = new Admin({
        username: username.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword
      });

      await admin.save();

      res.status(201).json({
        success: true,
        message: 'Admin created successfully',
        data: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });

    } catch (error) {
      console.error('Error in createInitialAdmin:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Update admin
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async updateAdmin(req, res) {
    try {
      const { adminId, username, email, role } = req.body;
      
      if (!adminId) {
        return res.status(400).json({
          success: false,
          message: 'Admin ID is required'
        });
      }

      // Find admin by ID
      const admin = await Admin.findById(adminId);
      
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'Admin not found'
        });
      }

      // Update fields
      if (username) admin.username = username.toLowerCase().trim();
      if (email) admin.email = email.toLowerCase().trim();
      if (role) admin.role = role;

      await admin.save();

      res.status(200).json({
        success: true,
        message: 'Admin updated successfully',
        data: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });

    } catch (error) {
      console.error('Error in updateAdmin:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get all admins (for management)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getAdmins(req, res) {
    try {
      const admins = await Admin.find({ isActive: true })
        .select('-password') // Exclude password from response
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: admins
      });

    } catch (error) {
      console.error('Error in getAdmins:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = AdminAuthController;
