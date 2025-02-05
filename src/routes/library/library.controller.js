const {
  searchAdobeApi,
  getRulesLibraryAdobeApi,
  createAdobeLibraryApi,
  // searchCompanyApi,
} = require('../../models/library.model');

const { extractThirdSegment } = require('../../utils/utils');

function countSegments(arr) {
  return arr.reduce((acc, str) => {
    const segment = extractThirdSegment(str);
    if (segment) {
      acc[segment] = (acc[segment] || 0) + 1;
    }
    return acc;
  }, {});
}

async function httpSearchLibrary(req, res) {
  const { libraryName, propertyName } = req.body;

  // Validate the request body
  if (!libraryName && !propertyName) {
    return res.status(400).json({
      error: 'Missing required libraryName and propertyName',
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

    // Step 2: Filter properties to find the one with the matching property name
    const property = properties.data.find(
      (prop) => prop.attributes.name === propertyName,
    );

    const libraryList = await searchAdobeApi(libraryName, property.id);

    if (!libraryList.data || libraryList.data.length === 0) {
      return res.status(500).json({
        error: 'Failed to retrieve library data',
      });
    }

    // Step 3: Filter libraries to find the one with the matching library name
    const library = libraryList.data.find(
      (lib) => lib.attributes.name === libraryName,
    );

    if (!library) {
      return res.status(404).json({
        error: 'Library not found',
      });
    }

    // Step 4: Return the combined result
    return res.status(200).json({
      library: library,
      property,
    });
  } catch (error) {
    // Error handling for failed API calls
    return res.status(500).json({
      error:
        'An error occurred while processing the library or property API calls',
      details: error.message,
    });
  }
}

async function httpBulkCreateLibrary(req, res) {
  const { propertiesId, libraryName } = req.body;

  // Validate the request body
  if ((!libraryName && !propertiesId) || propertiesId.length <= 0) {
    return res.status(400).json({
      error: 'Missing required libraryName and propertyName',
    });
  }

  //using promisall loopp propertiesId to call createAdobeLibraryApi
  try {
    const libraries = await Promise.all(
      propertiesId.map(async (propertyId) => {
        const library = await createAdobeLibraryApi(propertyId, libraryName);
        return { propertyId, library };
      }),
    );

    return res.status(200).json({ data: libraries });
  } catch (error) {
    // Error handling for failed API calls
    return res.status(500).json({
      error: 'An error occurred while processing the library API calls',
      details: error.message,
    });
  }
}

async function httpLibrarySummary(req, res) {
  const libraryId = req.params.id;
  console.log(`Summary for library ID: ${libraryId}`);

  try {
    const rulesLibrary = await getRulesLibraryAdobeApi(libraryId);

    if (!rulesLibrary) {
      return res.status(404).json({
        error: 'Library not found',
      });
    }

    const rulesName = [];
    rulesLibrary.data.forEach((rule) => {
      rulesName.push(rule.attributes.name);
    });

    return res.status(200).json({
      rulesName: countSegments(rulesName),
      total: rulesLibrary.data.length,
    });
  } catch (error) {
    console.error('Error fetching library details:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

module.exports = {
  httpSearchLibrary,
  httpLibrarySummary,
  httpBulkCreateLibrary,
};
