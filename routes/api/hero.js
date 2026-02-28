const express = require('express');
const router = express.Router();
const Hero = require('../../models/Hero');

// GET hero content
router.get('/', async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) {
      return res.status(404).json({ message: 'Hero content not found' });
    }
    res.json(hero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
