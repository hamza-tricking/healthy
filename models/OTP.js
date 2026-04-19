const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  otp: {
    type: String,
    required: [true, 'OTP is required'],
    minlength: [6, 'OTP must be 6 digits'],
    maxlength: [6, 'OTP must be 6 digits']
  },
  purpose: {
    type: String,
    required: [true, 'Purpose is required'],
    enum: ['email_verification', 'password_reset', 'login_verification'],
    default: 'email_verification'
  },
  expiresAt: {
    type: Date,
    required: [true, 'Expiration time is required'],
    default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  },
  attempts: {
    type: Number,
    default: 0,
    max: [5, 'Maximum attempts exceeded']
  },
  isUsed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
OTPSchema.index({ email: 1, purpose: 1 });
OTPSchema.index({ otp: 1 });

// TTL index to automatically expire OTPs
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Pre-save middleware to invalidate existing OTPs for same email and purpose
OTPSchema.pre('save', function(next) {
  if (this.isNew) {
    this.constructor.deleteMany({
      email: this.email,
      purpose: this.purpose,
      isUsed: false
    }).catch(error => {
      console.error('Error invalidating existing OTPs:', error);
    });
  }
  next();
});

module.exports = mongoose.model('OTP', OTPSchema);
