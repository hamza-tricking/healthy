require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://dmtart.pro', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
const BASE_PATH = process.env.BASE_PATH || '';

// API Routes with base path
app.use(`${BASE_PATH}/api/hero`, require('./routes/api/hero'));
app.use(`${BASE_PATH}/api/team`, require('./routes/api/team'));
app.use(`${BASE_PATH}/api/why-choose-us`, require('./routes/api/whyChooseUs'));
app.use(`${BASE_PATH}/api/services`, require('./routes/api/services'));
app.use(`${BASE_PATH}/api/pricing`, require('./routes/api/pricing'));
app.use(`${BASE_PATH}/api/location`, require('./routes/api/location'));

// Admin Routes with base path
app.use(`${BASE_PATH}/api/admin/hero`, require('./routes/admin/hero'));
app.use(`${BASE_PATH}/api/admin/team`, require('./routes/admin/team'));
app.use(`${BASE_PATH}/api/admin/why-choose-us`, require('./routes/admin/whyChooseUs'));
app.use(`${BASE_PATH}/api/admin/services`, require('./routes/admin/services'));
app.use(`${BASE_PATH}/api/admin/pricing`, require('./routes/admin/pricing'));
app.use(`${BASE_PATH}/api/admin/location`, require('./routes/admin/location'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}${BASE_PATH}/api`);
});
