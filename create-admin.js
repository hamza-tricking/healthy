const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Admin = require('./models/Admin');

const createInitialAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healing-hour');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [
        { username: 'healingadmin' },
        { email: 'Massagetherapy696@outlook.com' }
      ]
    });

    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.username);
      process.exit(0);
    }

    // Hash password before creating admin
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('adminhealing', salt);

    // Create initial admin
    const admin = new Admin({
      username: 'healingadmin',
      email: 'Massagetherapy696@outlook.com',
      password: hashedPassword,
      role: 'super_admin'
    });

    await admin.save();
    console.log('✅ Initial admin created successfully!');
    console.log('Username: healingadmin');
    console.log('Email: Massagetherapy696@outlook.com');
    console.log('Password: adminhealing');
    console.log('\n⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run the script
createInitialAdmin();
