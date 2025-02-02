const adobeApi = require('../service/adobeApi');

async function searchAdobeApi(keyWords, relationships) {
  console.log('Searching:', keyWords);

  try {
    const response = await adobeApi.post('/search', {
      data: {
        size: 10,
        query: {
          'attributes.name': {
            value: keyWords,
          },
          ...(relationships && {
            'relationships.property.data.id': {
              value: relationships,
            },
          }),
        },

        sort: [
          {
            'attributes.created_at': 'desc',
          },
        ],
        resource_types: ['libraries', 'properties'],
      },
    });

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

async function searchCompanyApi(companyId) {
  console.log('Searching for companyId:', companyId);

  try {
    const response = await adobeApi.get(`/companies/${companyId}`);

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
  searchCompanyApi,
};
