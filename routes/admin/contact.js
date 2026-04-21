const express = require('express');
const router = express.Router();
const Contact = require('../../models/Contact');

// GET /api/admin/contact - Get all contact submissions with full details
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    // Build query
    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Contact.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
    
  } catch (error) {
    console.error('Error fetching admin contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET /api/admin/contact/:id - Get single contact submission
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
    
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// PUT /api/admin/contact/:id - Update contact status and notes
router.put('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    // Update fields
    if (status) contact.status = status;
    if (notes !== undefined) contact.notes = notes;
    
    await contact.save();
    
    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
    
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// DELETE /api/admin/contact/:id - Delete contact submission
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    await Contact.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// PUT /api/admin/contact/mark-all-seen - Mark all contacts as seen
router.put('/mark-all-seen', async (req, res) => {
  try {
    const result = await Contact.updateMany(
      { seen: false },
      { seen: true }
    );
    
    res.json({
      success: true,
      message: `Marked ${result.modifiedCount} contacts as seen`,
      modifiedCount: result.modifiedCount
    });
    
  } catch (error) {
    console.error('Error marking contacts as seen:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET /api/admin/contact/unseen-count - Get count of unseen contacts
router.get('/unseen-count', async (req, res) => {
  try {
    const count = await Contact.countDocuments({ seen: false });
    
    res.json({
      success: true,
      data: count
    });
    
  } catch (error) {
    console.error('Error fetching unseen count:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET /api/admin/contact/recent-unseen - Get recent unseen contacts for notifications
router.get('/recent-unseen', async (req, res) => {
  try {
    const contacts = await Contact.find({ seen: false })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('fullName email massageType preferredDate preferredTime createdAt');
    
    res.json({
      success: true,
      data: contacts
    });
    
  } catch (error) {
    console.error('Error fetching recent unseen contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET /api/admin/contact/stats - Get contact statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Promise.all([
      Contact.countDocuments({ status: 'pending' }),
      Contact.countDocuments({ status: 'contacted' }),
      Contact.countDocuments({ status: 'booked' }),
      Contact.countDocuments({ status: 'cancelled' }),
      Contact.countDocuments({ 
        createdAt: { 
          $gte: new Date(new Date().setDate(new Date().getDate() - 30)) 
        } 
      })
    ]);
    
    const [pending, contacted, booked, cancelled, last30Days] = stats;
    
    // Get recent submissions
    const recentSubmissions = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName email preferredDate status createdAt');
    
    res.json({
      success: true,
      data: {
        overview: {
          pending,
          contacted,
          booked,
          cancelled,
          total: pending + contacted + booked + cancelled,
          last30Days
        },
        recentSubmissions
      }
    });
    
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
