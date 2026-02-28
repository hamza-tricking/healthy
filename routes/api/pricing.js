const express = require('express');
const router = express.Router();
const Pricing = require('../../models/Pricing');

// GET pricing content
router.get('/', async (req, res) => {
  try {
    const pricing = await Pricing.findOne();
    if (!pricing) {
      return res.status(404).json({ message: 'Pricing content not found' });
    }
    res.json(pricing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
