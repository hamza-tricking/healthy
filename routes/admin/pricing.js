const express = require('express');
const router = express.Router();
const Pricing = require('../../../models/Pricing');

// PUT update pricing content
router.put('/', async (req, res) => {
  try {
    let pricing = await Pricing.findOne();
    
    if (pricing) {
      // Update existing
      pricing = await Pricing.findOneAndUpdate({}, req.body, { new: true });
    } else {
      // Create new
      pricing = new Pricing(req.body);
      await pricing.save();
    }
    
    res.json(pricing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
