require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const healthTipsRoutes = require('./routes/healthTips');
const clinicsRoutes = require('./routes/clinics');
const healthRecordsRoutes = require('./routes/healthRecords');
const menstrualTrackerRoutes = require('./routes/menstrualTracker');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

// Database connection with better error handling
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI environment variable is not set');
      console.log('Please set up your MongoDB connection string in the .env file');
      console.log('You can use MongoDB Atlas (cloud) or any other MongoDB service');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('\nTo fix this error:');
    console.log('1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas');
    console.log('2. Create a new cluster');
    console.log('3. Get your connection string');
    console.log('4. Update the MONGODB_URI in your .env file');
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health-tips', healthTipsRoutes);
app.use('/api/clinics', clinicsRoutes);
app.use('/api/health-records', healthRecordsRoutes);
app.use('/api/menstrual-tracker', menstrualTrackerRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});