const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:5000';
const TEST_USER = {
  email: 'test@example.com',
  password: 'testpassword123'
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// Test functions
const testServerConnection = async () => {
  try {
    log('🔍 Testing server connection...', 'blue');
    const response = await axios.get(`${BASE_URL}/`);
    if (response.data === 'API is running...') {
      log('✅ Server is running successfully!', 'green');
      return true;
    } else {
      log('❌ Server response unexpected', 'red');
      return false;
    }
  } catch (error) {
    log('❌ Server connection failed. Make sure the server is running on port 5000', 'red');
    return false;
  }
};

const testUserRegistration = async () => {
  try {
    log('🔍 Testing user registration...', 'blue');
    const response = await axios.post(`${BASE_URL}/api/auth/register`, TEST_USER);
    if (response.data.token) {
      log('✅ User registration successful!', 'green');
      return response.data.token;
    } else {
      log('❌ User registration failed - no token received', 'red');
      return null;
    }
  } catch (error) {
    if (error.response?.status === 409) {
      log('⚠️  User already exists, proceeding with login test...', 'yellow');
      return null;
    } else {
      log('❌ User registration failed', 'red');
      log(`Error: ${error.response?.data?.message || error.message}`, 'red');
      return null;
    }
  }
};

const testUserLogin = async () => {
  try {
    log('🔍 Testing user login...', 'blue');
    const response = await axios.post(`${BASE_URL}/api/auth/login`, TEST_USER);
    if (response.data.token) {
      log('✅ User login successful!', 'green');
      return response.data.token;
    } else {
      log('❌ User login failed - no token received', 'red');
      return null;
    }
  } catch (error) {
    log('❌ User login failed', 'red');
    log(`Error: ${error.response?.data?.message || error.message}`, 'red');
    return null;
  }
};

const testPropertiesEndpoint = async (token) => {
  try {
    log('🔍 Testing properties endpoint...', 'blue');
    const response = await axios.get(`${BASE_URL}/api/properties`);
    if (Array.isArray(response.data)) {
      log('✅ Properties endpoint working!', 'green');
      log(`Found ${response.data.length} properties`, 'green');
      return true;
    } else {
      log('❌ Properties endpoint returned unexpected data format', 'red');
      return false;
    }
  } catch (error) {
    log('❌ Properties endpoint failed', 'red');
    log(`Error: ${error.response?.data?.message || error.message}`, 'red');
    return false;
  }
};

const testProtectedEndpoint = async (token) => {
  try {
    log('🔍 Testing protected endpoint...', 'blue');
    const response = await axios.get(`${BASE_URL}/api/properties`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    log('✅ Protected endpoint accessible with token!', 'green');
    return true;
  } catch (error) {
    log('❌ Protected endpoint failed', 'red');
    log(`Error: ${error.response?.data?.message || error.message}`, 'red');
    return false;
  }
};

// Main test runner
const runTests = async () => {
  log('🚀 Starting Real Estate Listing Manager Tests...', 'blue');
  log('==============================================', 'blue');
  
  // Test server connection
  const serverOk = await testServerConnection();
  if (!serverOk) {
    log('❌ Tests failed - server not accessible', 'red');
    process.exit(1);
  }
  
  // Test user registration/login
  let token = await testUserRegistration();
  if (!token) {
    token = await testUserLogin();
  }
  
  if (!token) {
    log('❌ Tests failed - authentication not working', 'red');
    process.exit(1);
  }
  
  // Test properties endpoint
  const propertiesOk = await testPropertiesEndpoint(token);
  
  // Test protected endpoint
  const protectedOk = await testProtectedEndpoint(token);
  
  // Summary
  log('==============================================', 'blue');
  log('📊 Test Summary:', 'blue');
  log(`✅ Server Connection: ${serverOk ? 'PASS' : 'FAIL'}`, serverOk ? 'green' : 'red');
  log(`✅ Authentication: ${token ? 'PASS' : 'FAIL'}`, token ? 'green' : 'red');
  log(`✅ Properties API: ${propertiesOk ? 'PASS' : 'FAIL'}`, propertiesOk ? 'green' : 'red');
  log(`✅ Protected Routes: ${protectedOk ? 'PASS' : 'FAIL'}`, protectedOk ? 'green' : 'red');
  
  if (serverOk && token && propertiesOk && protectedOk) {
    log('🎉 All tests passed! Your application is working correctly.', 'green');
    log('You can now start the frontend with: npm run dev', 'green');
  } else {
    log('❌ Some tests failed. Please check your setup.', 'red');
    process.exit(1);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(error => {
    log('❌ Test runner failed with error:', 'red');
    log(error.message, 'red');
    process.exit(1);
  });
}

module.exports = { runTests }; 