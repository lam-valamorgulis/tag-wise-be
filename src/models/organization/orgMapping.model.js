const OrgMapping = require('./orgMapping.mongo');

// Define the helper function to query by site code
async function getOrgCategoryBySiteCode(siteCode) {
  console.log('siteCode:', siteCode);
  try {
    const result = await OrgMapping.findOne(
      { 'orgs.countries.siteCodes': siteCode },
      { orgCategory: 1, _id: 0 },
    ).lean();

    if (result) {
      console.log('Org Category:', result.orgCategory);
      return result.orgCategory;
    }
    console.log('No org category found for site code:', siteCode);
    return null;
  } catch (err) {
    console.error('Error querying org category by site code:', err);
    throw err;
  }
}

module.exports = { getOrgCategoryBySiteCode };
