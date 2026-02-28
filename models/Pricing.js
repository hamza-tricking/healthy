const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pricing', pricingSchema);
