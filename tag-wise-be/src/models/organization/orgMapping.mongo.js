const mongoose = require('mongoose');

// Define your schemas
const CountrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  siteCodes: { type: [String], required: true },
});

const OrgSchema = new mongoose.Schema({
  org: { type: String, required: true },
  countries: { type: [CountrySchema], required: true },
});

const OrgMappingSchema = new mongoose.Schema({
  orgCategory: { type: String, required: true },
  orgs: { type: [OrgSchema], required: true },
});

const OrgMapping = mongoose.model('OrgMapping', OrgMappingSchema);

module.exports = OrgMapping;
