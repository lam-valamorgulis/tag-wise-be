const getPropertyAdobeApi = require('../../models/property.model');
const { searchAdobeApi } = require('../../models/library.model');
const { extractStringBetweenUnderscoreAndDash } = require('../../utils/utils');
const siteCode = require('../../data/siteCode');

async function httpGetDetailProperty(req, res) {
  const propertyId = req.params.id;

  try {
    // Simulate fetching data from a database or external service
    const propertyDetails = await getPropertyAdobeApi(propertyId);

    if (!propertyDetails) {
      return res.status(404).json({
        error: 'Property not found',
      });
    }

    // retrieve information about the property from the named property
    const namedProperty = extractStringBetweenUnderscoreAndDash(
      propertyDetails.data.attributes.name,
    );

    // Retrieve the site code from the named property
    const propertySiteCode = siteCode.siteCode[namedProperty];

    // Return the property details
    return res.status(200).json({
      propertyName: propertyDetails.data.attributes.name || '',
      propertySiteCode,
    });
  } catch (error) {
    // console.error('Error fetching property details:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

async function httpGetListProperty(req, res) {
  const { propertyName } = req.body;

  // Validate the request body
  if (!propertyName) {
    return res.status(400).json({
      error: 'Missing required propertyName',
    });
  }

  try {
    // Step 1: Use the propertiy name to search for property:
    const properties = await searchAdobeApi(propertyName);

    if (!properties.data) {
      return res.status(500).json({
        error: 'Failed to retrieve property data',
      });
    }
    const result = properties.data.map((item) => ({
      propertyId: item.id,
      propertyName: item.attributes.name,
    }));

    // Step 4: Return the combined result
    return res.status(200).json({ data: result });
  } catch (error) {
    // Error handling for failed API calls
    return res.status(500).json({
      error:
        'An error occurred while processing the library or property API calls',
      details: error.message,
    });
  }
}

module.exports = { httpGetDetailProperty, httpGetListProperty };
