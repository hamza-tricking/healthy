const express = require('express');
const router = express.Router();
const Team = require('../../models/Team');

// POST add team member
router.post('/', async (req, res) => {
  try {
    const member = new Team(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT update team member
router.put('/:id', async (req, res) => {
  try {
    const member = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    res.json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE team member
router.delete('/:id', async (req, res) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
