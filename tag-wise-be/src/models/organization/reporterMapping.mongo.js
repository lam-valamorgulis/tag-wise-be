// insertMapping.js
const mongoose = require('mongoose');

// Define a schema for a mapping document
const MappingSchema = new mongoose.Schema({
  rhq: { type: String, required: true },
  subsidiary: { type: String, required: true },
});

// Create the model
const MappingReporter = mongoose.model('Mapping', MappingSchema);

module.exports = MappingReporter;
