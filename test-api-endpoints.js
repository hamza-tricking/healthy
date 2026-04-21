// Test API Endpoints
const axios = require('axios');

const testEndpoints = async () => {
  console.log('🧪 Testing API Endpoints...\n');

  const baseURL = 'https://dmtart.pro/healthy/api';
  
  try {
    // Test 1: Check if admin-auth route exists
    console.log('📍 Test 1: POST /admin-auth/send-reset-otp');
    try {
      const response = await axios.post(`${baseURL}/admin-auth/send-reset-otp`, {
        email: 'test@example.com'
      });
      console.log('✅ Route exists:', response.status);
      console.log('Response:', response.data);
    } catch (error) {
      if (error.response) {
        console.log('❌ Route failed:', error.response.status);
        console.log('Error data:', error.response.data);
      } else {
        console.log('❌ Network error:', error.message);
      }
    }

    // Test 2: Check if admin-auth/login route exists
    console.log('\n📍 Test 2: POST /admin-auth/login');
    try {
      const response = await axios.post(`${baseURL}/admin-auth/login`, {
        username: 'test',
        password: 'test'
      });
      console.log('✅ Route exists:', response.status);
    } catch (error) {
      if (error.response) {
        console.log('❌ Route failed:', error.response.status);
        console.log('Error data:', error.response.data);
      } else {
        console.log('❌ Network error:', error.message);
      }
    }

    // Test 3: Check if OTP route exists
    console.log('\n📍 Test 3: POST /otp/send');
    try {
      const response = await axios.post(`${baseURL}/otp/send`, {
        email: 'test@example.com',
        purpose: 'password_reset'
      });
      console.log('✅ Route exists:', response.status);
    } catch (error) {
      if (error.response) {
        console.log('❌ Route failed:', error.response.status);
        console.log('Error data:', error.response.data);
      } else {
        console.log('❌ Network error:', error.message);
      }
    }

  } catch (error) {
    console.error('Test failed:', error);
  }
};

testEndpoints();
