const mongoose = require('mongoose');

const whyChooseUsSchema = new mongoose.Schema({
  mainImage: { type: String, required: true },
  mainHeading: { type: String, required: true },
  mainDescription: { type: String, required: true },
  features: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String } // SVG icon or emoji
  }],
  ctaHeading: { type: String },
  ctaDescription: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('WhyChooseUs', whyChooseUsSchema);
