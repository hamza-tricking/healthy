const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  travelFeePackage: {
    title: { type: String, required: true, default: 'Travel Fee' },
    timeRange: { type: String, required: true, default: 'Price from 9:00 AM until 11.00 PM' },
    originalPrice: { type: Number, required: true, default: 90 },
    discountedPrice: { type: Number, required: true, default: 70 },
    options: [{
      duration: { type: String, required: true },
      price: { type: String, required: true }
    }]
  },
  uberPackageComplex: {
    title: { type: String, required: true, default: 'Uber Package' },
    timeRange: { type: String, required: true, default: 'Price from 11.00 PM until 2:00 AM' },
    originalPrice: { type: Number, required: true, default: 130 },
    discountedPrice: { type: Number, required: true, default: 110 },
    options: [{
      duration: { type: String, required: true },
      price: { type: String, required: true }
    }]
  },
  safetyNotice: {
    heading: { type: String, required: true, default: '* MASSAGE TRAVEL FEE ARE REQUIRED' },
    content: { type: String, required: true, default: 'All massage sessions require travel fee payment' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pricing', pricingSchema);
