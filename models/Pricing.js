const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  // Simple structure for server compatibility
  travelFee: {
    title: { type: String, required: true },
    price: { type: String, required: true },
    options: [{ type: String }],
    safetyNotice: { type: String }
  },
  uberPackage: {
    title: { type: String, required: true },
    price: { type: String, required: true },
    options: [{ type: String }],
    safetyNotice: { type: String }
  },
  // Complex structure for home page
  travelFeePackage: {
    title: { type: String },
    timeRange: { type: String },
    originalPrice: { type: Number },
    discountedPrice: { type: Number },
    options: [{
      duration: { type: String },
      price: { type: String }
    }]
  },
  uberPackageComplex: {
    title: { type: String },
    timeRange: { type: String },
    originalPrice: { type: Number },
    discountedPrice: { type: Number },
    options: [{
      duration: { type: String },
      price: { type: String }
    }]
  },
  safetyNotice: {
    heading: { type: String },
    content: { type: String }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pricing', pricingSchema);
