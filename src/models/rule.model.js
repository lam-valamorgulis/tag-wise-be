const adobeApi = require('../service/adobeApi');

async function getRuleComponentsAdobeApi(ruleId) {
  console.log('Searching for rule id:', ruleId);

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

module.exports = {
  getRuleComponentsAdobeApi,
};
