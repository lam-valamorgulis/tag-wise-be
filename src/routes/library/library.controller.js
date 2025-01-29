const {
  searchAdobeApi,
  searchPropertyApi,
  getRulesLibraryAdobeApi,
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
  const searchParams = req.body;

  // Validate the request body
  if (!searchParams.libraryName) {
    return res.status(400).json({
      error: 'Missing required library property',
    });
  }

  try {
    // Step 1: Call the Adobe Library API
    const library = await searchAdobeApi(searchParams.libraryName);
    if (!library) {
      return res.status(500).json({
        error: 'Failed to retrieve library data',
      });
    }

    // Step 2: Use the library ID to call the Property API
    const property = await searchPropertyApi(library.data[0].id);

    console.log(property);

    // Step 3: Return the combined result
    return res.status(201).json({
      library,
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

async function httpLibrarySummary(req, res) {
  const libraryId = req.params.id;
  console.log(`Summary for library ID: ${libraryId}`);

  try {
    // Simulate fetching data from a database or external service
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
      rules: rulesName,
      rulesLibrary: rulesLibrary.data,
    });
  } catch (error) {
    console.error('Error fetching library details:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

module.exports = { httpSearchLibrary, httpLibrarySummary };
