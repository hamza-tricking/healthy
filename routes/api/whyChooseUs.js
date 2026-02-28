const express = require('express');
const router = express.Router();
const WhyChooseUs = require('../../models/WhyChooseUs');

// GET why choose us content
router.get('/', async (req, res) => {
  try {
    const content = await WhyChooseUs.findOne();
    if (!content) {
      return res.status(404).json({ message: 'Why Choose Us content not found' });
    }
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
