const {
  getOrgCategoryBySiteCode,
} = require('../../models/organization/orgMapping.model');
const { queryMapping } = require('../../utils/utils');
const {
  getReporterType,
} = require('../../models/organization/reporterMapping.model');

async function httpAccountProfile(req, res) {
  try {
    const { siteCode, subsidinary, isHq } = req.body;
    console.log(siteCode, subsidinary, isHq);

    if (!siteCode || !subsidinary) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'siteCode and subsidinary are required',
      });
    }

    // Await the async function getOrgCategoryBySiteCode
    const subType = await getOrgCategoryBySiteCode(siteCode);
    if (!subType) {
      return res.status(404).json({
        error: 'Organization category not found for provided site code',
      });
    }

    // Await getReporterType because it is asynchronous
    const reporterType = await getReporterType(subsidinary);
    console.log(`orgCategory: ${subType}, reporterType: ${reporterType}`);

    // Determine which mapping to use based on isHq and subsidinary
    let mappingResult;
    if (subsidinary === 'SEA HQ') {
      mappingResult = '- Default user access\n- Requested R/S (subsidiaries)';
    } else if (isHq) {
      mappingResult = queryMapping(subType, 'HQ');
    } else {
      mappingResult = queryMapping(subType, reporterType);
    }

    return res.status(200).json({
      orgCategory: subType,
      reporterType,
      mapping: mappingResult,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Account Profile creation failed',
      message: error.message,
    });
  }
}

module.exports = { httpAccountProfile };
