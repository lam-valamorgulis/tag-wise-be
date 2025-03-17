const adobeApi = require('../service/adobeApi');

async function getPropertyAdobeApi(protertyId) {
  console.log('Searching for property:', protertyId);

  try {
    const response = await adobeApi.get(`/properties/${protertyId}`);

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

module.exports = getPropertyAdobeApi;
