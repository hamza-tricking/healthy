const express = require('express');
const router = express.Router();
const Contact = require('../../models/Contact');

// POST /api/contact - Submit new contact form
router.post('/', async (req, res) => {
  try {
    const contactData = req.body;
    
    // Validate required fields
    const requiredFields = [
      'fullName', 'email', 'phone', 'preferredDate', 
      'preferredTime', 'location', 'massageType', 
      'duration', 'hadMassageBefore'
    ];
    
    for (const field of requiredFields) {
      if (!contactData[field]) {
        return res.status(400).json({ 
          success: false, 
          message: `${field} is required` 
        });
      }
    }
    
    // Create new contact submission
    const newContact = new Contact(contactData);
    await newContact.save();
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: newContact
    });
    
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contact submissions (public - limited info)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .select('fullName email preferredDate preferredTime status createdAt')
      .sort({ createdAt: -1 })
      .limit(10); // Limit to 10 most recent for public view
    
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
    
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
