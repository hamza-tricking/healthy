const express = require('express');
const router = express.Router();
const Hero = require('../../../models/Hero');

// PUT update hero content
router.put('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    
    if (hero) {
      // Update existing
      hero = await Hero.findOneAndUpdate({}, req.body, { new: true });
    } else {
      // Create new
      hero = new Hero(req.body);
      await hero.save();
    }
    
    res.json(hero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
