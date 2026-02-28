require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/api/hero', require('./routes/api/hero'));
app.use('/api/team', require('./routes/api/team'));
app.use('/api/why-choose-us', require('./routes/api/whyChooseUs'));
app.use('/api/services', require('./routes/api/services'));
app.use('/api/pricing', require('./routes/api/pricing'));
app.use('/api/location', require('./routes/api/location'));

// Admin Routes
app.use('/api/admin/hero', require('./routes/admin/hero'));
app.use('/api/admin/team', require('./routes/admin/team'));
app.use('/api/admin/why-choose-us', require('./routes/admin/whyChooseUs'));
app.use('/api/admin/services', require('./routes/admin/services'));
app.use('/api/admin/pricing', require('./routes/admin/pricing'));
app.use('/api/admin/location', require('./routes/admin/location'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}/api`);
});
