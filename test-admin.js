// Quick test for admin creation
const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('./models/Admin');

const testAdminCreation = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healing-hour');
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [
        { username: 'healingadmin' },
        { email: 'Massagetherapy696@outlook.com' }
      ]
    });

    if (existingAdmin) {
      console.log('ℹ️  Admin already exists:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
    } else {
      console.log('ℹ️  Admin does not exist yet. Ready to create.');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

testAdminCreation();
