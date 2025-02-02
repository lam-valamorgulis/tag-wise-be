const adobeApi = require('../service/adobeApi');

async function getRuleComponentsAdobeApi(ruleId) {
  try {
    const response = await adobeApi.get(
      `/rules/${ruleId}/rule_components?page[size]=999`,
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

async function getRulesLibraryAdobeApi(libraryId) {
  console.log('Searching for libraryId:', libraryId);
  try {
    //             "related": "https://reactor.adobe.io/libraries/LBb174d60bdbd34f87a2e9466fadaacae0/rules",

    const response = await adobeApi.get(`/libraries/${libraryId}/rules`);

    console.log('Adobe API response:', response.data, 32);

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
  getRuleComponentsAdobeApi,
  getRulesLibraryAdobeApi,
};
