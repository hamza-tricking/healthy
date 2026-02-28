const express = require('express');
const router = express.Router();
const Location = require('../../models/Location');

// PUT update location content
router.put('/', async (req, res) => {
  try {
    let location = await Location.findOne();
    
    if (location) {
      // Update existing
      location = await Location.findOneAndUpdate({}, req.body, { new: true });
    } else {
      // Create new
      location = new Location(req.body);
      await location.save();
    }
    
    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
