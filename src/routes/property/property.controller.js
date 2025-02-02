const getPropertyAdobeApi = require('../../models/property.model');
const { extractStringBetweenUnderscoreAndDash } = require('../../utils/utils');
const siteCode = require('../../data/siteCode');

async function httpGetDetailProperty(req, res) {
  const propertyId = req.params.id;

  try {
    // Log the request for debugging
    console.log(`Fetching details for property ID: ${propertyId}`);

    // Simulate fetching data from a database or external service
    const propertyDetails = await getPropertyAdobeApi(propertyId);

    if (!propertyDetails) {
      return res.status(404).json({
        error: 'Property not found',
      });
    }

    console.log('Property details:', propertyDetails);

    // retrieve information about the property from the named property
    const namedProperty = extractStringBetweenUnderscoreAndDash(
      propertyDetails.data.attributes.name,
    );

    // Retrieve the site code from the named property
    const propertySiteCode = siteCode.siteCode[namedProperty];

    console.log(`Retrieved site code: ${propertySiteCode}`);

    // Return the property details
    return res.status(200).json(propertySiteCode);
  } catch (error) {
    console.error('Error fetching property details:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

module.exports = { httpGetDetailProperty };
