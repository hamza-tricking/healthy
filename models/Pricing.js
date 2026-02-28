const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  travelFeePackage: {
    title: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    options: [{
      duration: { type: String, required: true },
      price: { type: String, required: true }
    }]
  },
  uberPackage: {
    title: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    options: [{
      duration: { type: String, required: true },
      price: { type: String, required: true }
    }]
  },
  safetyNotice: {
    heading: { type: String, required: true },
    content: { type: String, required: true }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pricing', pricingSchema);
