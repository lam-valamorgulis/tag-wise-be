const getPropertyAdobeApi = require('../../models/property.model');
const { searchAdobeApi } = require('../../models/library.model');
const { extractStringBetweenUnderscoreAndDash } = require('../../utils/utils');
const siteCode = require('../../data/siteCode');

async function httpGetDetailProperty(req, res) {
  const propertyId = req.params.id;

  try {
    const propertyDetails = await getPropertyAdobeApi(propertyId);

    if (!propertyDetails) {
      return res.status(404).json({
        error: 'Property not found',
      });
    }
    const nameProperty = propertyDetails.data.attributes.name;

    const namePropertySitecode =
      extractStringBetweenUnderscoreAndDash(nameProperty) || '';

    // Retrieve the site code from the named property
    const propertySiteCode = siteCode.siteCode[namePropertySitecode] || {};

    // Add section based on nameProperty
    const section = nameProperty.toLowerCase().includes('shop')
      ? 'Shop'
      : 'AEM';
    propertySiteCode.section = section;

    // Return the property details
    return res.status(200).json({
      propertyName: nameProperty || '',
      propertySiteCode,
    });
  } catch (error) {
    console.error('Error in httpGetDetailProperty:', error);
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
