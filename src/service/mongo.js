const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/tagwise';

// Remove deprecated options and add recommended ones
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000, // Server selection timeout
  socketTimeoutMS: 45000, // Socket timeout
  family: 4, // Use IPv4, skip trying IPv6
};

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready! Database:', mongoose.connection.name);
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

async function mongoConnect() {
  try {
    await mongoose.connect(MONGO_URL, mongooseOptions);
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
    throw error;
  }
}

async function mongoDisconnect() {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
