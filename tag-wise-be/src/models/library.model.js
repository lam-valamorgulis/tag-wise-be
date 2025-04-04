const adobeApi = require('../service/adobeApi');

async function getLibraryByIdApi(libraryId) {
  try {
    const response = await adobeApi.get(`/libraries/${libraryId}`);

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

async function createAdobeLibraryApi(propertyId, libraryName) {
  try {
    const response = await adobeApi.post(
      `/properties/${propertyId}/libraries`,
      {
        data: {
          attributes: {
            name: libraryName,
          },
          type: 'libraries',
        },
      },
    );

    return response.data;
  } catch (error) {
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
    throw new Error('Failed to create library in Adobe API');
  }
}

async function searchAdobeApi(keyWords, relationships) {
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
  try {
    const response = await adobeApi.get(`/libraries/${propertyId}/property`);

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
  try {
    const response = await adobeApi.get(`/companies/${companyId}`);

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

async function getLibraryExtention(libraryId) {
  try {
    const response = await adobeApi.get(
      `/libraries/${libraryId}/extensions?page[size]=100&page[number]=1`,
    );

    return response.data;
  } catch (error) {
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

async function getLibraryDateElement(libraryId) {
  try {
    const response = await adobeApi.get(
      `/libraries/${libraryId}/data_elements?page[size]=100&page[number]=1`,
    );

    return response.data;
  } catch (error) {
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
  getLibraryByIdApi,
  searchCompanyApi,
  createAdobeLibraryApi,
  getLibraryExtention,
  getLibraryDateElement,
};
