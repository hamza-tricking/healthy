// Simple test for admin creation
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/Admin');

const testCreateAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healing-hour');
    console.log('✅ Connected to MongoDB');

    // Test password hashing
    const testPassword = 'adminhealing';
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(testPassword, salt);
    
    console.log('🔐 Password hashing test:');
    console.log('Original:', testPassword);
    console.log('Hashed:', hashedPassword);
    console.log('');

    // Create test admin
    const admin = new Admin({
      username: 'testadmin',
      email: 'test@example.com',
      password: hashedPassword
    });

    await admin.save();
    console.log('✅ Test admin created successfully!');
    console.log('ID:', admin._id);
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);

    // Clean up - delete test admin
    await Admin.deleteOne({ _id: admin._id });
    console.log('🧹 Test admin cleaned up');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

testCreateAdmin();
