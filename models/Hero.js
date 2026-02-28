const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  logoUrl: { 
    type: String, 
    default: "https://via.placeholder.com/150x50.png?text=LOGO" 
  },
  carouselImages: [{
    url: { type: String, required: true },
    alt: { type: String, required: true }
  }],
  floatingPhotos: [{
    url: { type: String, required: true },
    x: { type: String, required: true },
    y: { type: String, required: true },
    size: { type: Number, required: true },
    delay: { type: Number, required: true }
  }],
  mainHeading: { type: String, required: true },
  subHeading: { type: String, required: true },
  description: { type: String, required: true },
  buttonTexts: [{ type: String }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Hero', heroSchema);
