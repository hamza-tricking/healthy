// Simple server startup script with contact API testing
const { spawn } = require('child_process');
const http = require('http');

// Function to check if server is running
const checkServer = (port) => {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: port,
      path: '/',
      method: 'GET',
      timeout: 2000
    }, (res) => {
      resolve(true);
    });
    
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
};

// Function to test contact API
const testContactAPI = async () => {
  try {
    const testData = {
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '+447843018518',
      preferredDate: '2024-12-25',
      preferredTime: '10:00 AM',
      location: 'Test Location',
      massageType: 'Swedish Massage',
      duration: '60 minutes',
      hadMassageBefore: 'No',
      message: 'Test message'
    };

    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (response.ok) {
      console.log('SUCCESS: Contact API is working locally!');
      return true;
    } else {
      console.log('ERROR: Contact API returned an error');
      return false;
    }
  } catch (error) {
    console.log('ERROR: Could not test contact API:', error.message);
    return false;
  }
};

// Main function
const startServer = async () => {
  const port = process.env.PORT || 5000;
  
  console.log('Checking if server is already running...');
  const isRunning = await checkServer(port);
  
  if (isRunning) {
    console.log('Server is already running on port', port);
    
    // Test contact API
    const apiWorks = await testContactAPI();
    if (apiWorks) {
      console.log('Contact API is working correctly!');
    } else {
      console.log('Contact API test failed');
    }
  } else {
    console.log('Starting server...');
    
    // Start the server
    const server = spawn('node', ['server.js'], {
      stdio: 'inherit',
      shell: true
    });
    
    // Wait a bit for server to start
    setTimeout(async () => {
      const serverStarted = await checkServer(port);
      if (serverStarted) {
        console.log('Server started successfully on port', port);
        
        // Test contact API
        const apiWorks = await testContactAPI();
        if (apiWorks) {
          console.log('Contact API is working correctly!');
        } else {
          console.log('Contact API test failed');
        }
      } else {
        console.log('Failed to start server');
      }
    }, 3000);
    
    // Handle server exit
    server.on('close', (code) => {
      console.log(`Server process exited with code ${code}`);
    });
  }
};

startServer().catch(console.error);
