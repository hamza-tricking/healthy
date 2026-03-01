const mongoose = require('mongoose');
const Location = require('../models/Location');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/healthy');

const seedLocation = async () => {
  try {
    // Clear existing location data
    await Location.deleteMany({});
    console.log('Cleared existing location data');

    // Create location data matching the home page
    const locationData = {
      backgroundImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      address: {
        line1: 'United Kingdom',
        line2: 'London area'
      },
      contact: {
        phone: '+44 7400 415437',
        email: 'info@massagetherapy.co.uk'
      },
      hours: 'Monday - Sunday: 9:00 AM - 2:00 AM',
      mapEmbedUrl: 'https://maps.app.goo.gl/e1L4HqAyKnA3DsKH8'
    };

    // Insert the location data
    const location = new Location(locationData);
    await location.save();
    console.log('Location data seeded successfully');

    console.log('Location seeding completed!');
  } catch (error) {
    console.error('Error seeding location:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedLocation();
