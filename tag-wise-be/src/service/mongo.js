const mongoose = require('mongoose');
const { orgMapping, mappingsData } = require('../data/orgMapping');
const OrgMapping = require('../models/organization/orgMapping.mongo');
const MappingReporter = require('../models/organization/reporterMapping.mongo');

require('dotenv').config();

// Update below to match your own MongoDB connection string.
const { MONGO_URL } = process.env;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});
async function mongoConnect() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connection established successfully.');

    const countOrg = await OrgMapping.countDocuments({});
    if (countOrg === 0) {
      await OrgMapping.insertMany(orgMapping);
      console.log('Data inserted successfully.');
    } else {
      console.log('Data already exists. Skipping insertion.');
    }

    const countMappingReporter = await MappingReporter.countDocuments({});
    if (countMappingReporter === 0) {
      await MappingReporter.insertMany(mappingsData);
      console.log('Data inserted successfully.');
    } else {
      console.log('Data already exists. Skipping insertion.');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB or inserting data:', error);
    throw error;
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
