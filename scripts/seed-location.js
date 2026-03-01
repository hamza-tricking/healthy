const mongoose = require('mongoose');
const Location = require('../models/Location');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/healthy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.432384928423!2d-0.122920684423873!3d51.51121371806905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ca7d2d3b7b%3A0x4f3b5b5b5b5b5b5b!2sCovent%20Garden%2C%20London%2C%20UK!5e0!3m2!1sen!2sus!4v1234567890'
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
