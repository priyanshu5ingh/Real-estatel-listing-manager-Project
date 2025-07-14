const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const propertyRoutes = require('./routes/property');
app.use('/api/properties', propertyRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/realestate';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  }); 