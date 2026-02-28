const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  backgroundImage: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    line2: { type: String, required: true }
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  hours: { type: String, required: true },
  mapEmbedUrl: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);
