const MappingReporter = require('./reporterMapping.mongo');

async function getReporterType(inputCode) {
  try {
    // First, check if the input code matches the 'rhq' field
    const docRhq = await MappingReporter.findOne({ rhq: inputCode }).lean();
    if (docRhq) {
      console.log(`Input code "${inputCode}" found in RHQ field.`);
      return 'RHQ';
    }
    // Next, check if the input code matches the 'subsidiary' field
    const docSubs = await MappingReporter.findOne({
      subsidiary: inputCode,
    }).lean();
    if (docSubs) {
      console.log(`Input code "${inputCode}" found in Subsidiary field.`);
      return 'Subsidiary';
    }
    console.log(`Input code "${inputCode}" not found in any mapping.`);
    return null;
  } catch (err) {
    console.error('Error while querying mapping:', err);
    throw err;
  }
}

module.exports = { getReporterType };
