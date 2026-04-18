const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  preferredDate: {
    type: String,
    required: [true, 'Preferred date is required']
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  massageType: {
    type: String,
    required: [true, 'Massage type is required'],
    enum: [
      'Swedish Massage',
      'Deep Tissue',
      'Therapeutic full body massage',
      'Aromatherapy',
      'Couples massage',
      'Reflexology',
      'Other'
    ]
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    enum: ['60 minutes', '90 minutes', '120 minutes']
  },
  preferredTherapist: {
    type: String,
    trim: true,
    default: ''
  },
  hadMassageBefore: {
    type: String,
    required: [true, 'This field is required'],
    enum: ['Yes', 'No']
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'booked', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

// Index for better query performance
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ status: 1 });
ContactSchema.index({ email: 1 });

module.exports = mongoose.model('Contact', ContactSchema);
