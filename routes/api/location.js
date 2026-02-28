const express = require('express');
const router = express.Router();
const Location = require('../../models/Location');

// GET location content
router.get('/', async (req, res) => {
  try {
    const location = await Location.findOne();
    if (!location) {
      return res.status(404).json({ message: 'Location content not found' });
    }
    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
