const adobeApi = require('../service/adobeApi');

async function searchAdobeApi(libraryName) {
  console.log('Searching for library:', libraryName);

  try {
    const response = await adobeApi.post('/search', {
      data: {
        size: 1,
        query: {
          'attributes.name': {
            value: libraryName,
          },
        },
        sort: [
          {
            'attributes.created_at': 'desc',
          },
        ],
        resource_types: ['libraries'],
      },
    });

    console.log('Adobe API response:', response.data);

    return response.data;
  } catch (error) {
    // Improved error handling
    if (error.response) {
      console.error(
        'Adobe API Error Response:',
        error.response.status,
        error.response.statusText,
        error.response.data,
      );
    } else {
      console.error('Error calling Adobe API:', error.message);
    }
    throw new Error('Failed to fetch data from Adobe API');
  }
}

async function searchPropertyApi(propertyId) {
  console.log('Searching for propertyId:', propertyId);

  try {
    const response = await adobeApi.get(`/libraries/${propertyId}/property`);

    console.log('Adobe API response:', response.data);
    return response.data;
  } catch (error) {
    // Improved error handling
    if (error.response) {
      console.error(
        'Adobe API Error Response:',
        error.response.status,
        error.response.statusText,
        error.response.data,
      );
    } else {
      console.error('Error calling Adobe API:', error.message);
    }
    throw new Error('Failed to fetch data from Adobe API');
  }
}

async function getRulesLibraryAdobeApi(libraryId) {
  console.log('Searching for property:', libraryId);

  try {
    const response = await adobeApi.get(
      `/libraries/${libraryId}/rules?page[size]=100&page[number]=1`,
    );

    console.log('Adobe API response:', response.data);

    return response.data;
  } catch (error) {
    // Improved error handling
    if (error.response) {
      console.error(
        'Adobe API Error Response:',
        error.response.status,
        error.response.statusText,
        error.response.data,
      );
    } else {
      console.error('Error calling Adobe API:', error.message);
    }
    throw new Error('Failed to fetch data from Adobe API');
  }
}

module.exports = {
  searchAdobeApi,
  searchPropertyApi,
  getRulesLibraryAdobeApi,
};
