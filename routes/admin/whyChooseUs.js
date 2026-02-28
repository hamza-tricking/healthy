const express = require('express');
const router = express.Router();
const WhyChooseUs = require('../../models/WhyChooseUs');

// PUT update why choose us content
router.put('/', async (req, res) => {
  try {
    let content = await WhyChooseUs.findOne();
    
    if (content) {
      // Update existing
      content = await WhyChooseUs.findOneAndUpdate({}, req.body, { new: true });
    } else {
      // Create new
      content = new WhyChooseUs(req.body);
      await content.save();
    }
    
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
