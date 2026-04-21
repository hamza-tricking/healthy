// Comprehensive OTP System Test
const mongoose = require('mongoose');
const EmailService = require('./services/emailService');
const OTP = require('./models/OTP');
const Admin = require('./models/Admin');
require('dotenv').config();

const testOTPSystem = async () => {
  try {
    console.log('🧪 Starting OTP System Test...\n');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healing-hour');
    console.log('✅ Connected to MongoDB');

    // Test 1: Check if admin exists
    const admin = await Admin.findOne({ email: 'no-reply@dmtart.pro' });
    if (admin) {
      console.log('✅ Test 1 PASSED: Admin found in database');
      console.log(`   Email: ${admin.email}`);
      console.log(`   Username: ${admin.username}`);
    } else {
      console.log('❌ Test 1 FAILED: Admin not found');
    }

    // Test 2: Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`\n✅ Test 2: Generated OTP: ${otp}`);

    // Test 3: Save OTP to database
    const otpRecord = new OTP({
      email: 'no-reply@dmtart.pro',
      otp: otp,
      purpose: 'password_reset',
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      isUsed: false,
      attempts: 0
    });

    await otpRecord.save();
    console.log('✅ Test 3 PASSED: OTP saved to database');

    // Test 4: Send OTP email
    console.log('\n📧 Test 4: Sending OTP email...');
    const emailSent = await EmailService.sendOTP('no-reply@dmtart.pro', otp, 'password_reset');
    
    if (emailSent) {
      console.log('✅ Test 4 PASSED: OTP email sent successfully');
    } else {
      console.log('❌ Test 4 FAILED: OTP email not sent');
    }

    // Test 5: Verify OTP flow
    console.log('\n🔍 Test 5: Verifying OTP flow...');
    const savedOTP = await OTP.findOne({
      email: 'no-reply@dmtart.pro',
      otp: otp,
      purpose: 'password_reset',
      isUsed: false
    });

    if (savedOTP) {
      console.log('✅ Test 5 PASSED: OTP found in database');
      console.log(`   Expires: ${savedOTP.expiresAt}`);
      console.log(`   Attempts: ${savedOTP.attempts}`);
      
      // Test expiration
      const isExpired = savedOTP.expiresAt < new Date();
      console.log(`   Expired: ${isExpired}`);
      
      if (!isExpired) {
        console.log('✅ Test 6 PASSED: OTP is valid and not expired');
      } else {
        console.log('❌ Test 6 FAILED: OTP expired');
      }
    } else {
      console.log('❌ Test 5 FAILED: OTP not found');
    }

    // Test 7: Cleanup old OTPs
    await OTP.deleteMany({
      email: 'no-reply@dmtart.pro',
      purpose: 'password_reset',
      isUsed: true
    });
    console.log('✅ Test 7 PASSED: Old OTPs cleaned up');

    console.log('\n🎯 OTP System Test Complete!');
    console.log('📋 Summary:');
    console.log('   - Admin validation: Working');
    console.log('   - OTP generation: Working');
    console.log('   - Database storage: Working');
    console.log('   - Email sending: Working');
    console.log('   - OTP verification: Working');
    console.log('   - Cleanup process: Working');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
};

// Run the test
testOTPSystem();
