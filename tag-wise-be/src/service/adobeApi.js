const axios = require('axios');

// Create an Axios instance
const adobeApi = axios.create({
  baseURL: process.env.ADOBE_BASE_URL,
  headers: {
    accept: 'application/vnd.api+json;revision=1',
    'content-type': 'application/vnd.api+json',
    'x-api-key': process.env.ADOBE_CLIENT_ID,
    'x-gw-ims-org-id': process.env.ADOBE_ORGANIZATION_ID,
  },
});

let adobeToken = null;
let tokenExpiresAt = null;

const refreshAdobeToken = async () => {
  // console.log('Refreshing Adobe token...');
  try {
    const response = await axios.post(
      process.env.ADOBE_ACCESSTOKEN_URL,
      {
        grant_type: 'client_credentials',
        client_id: process.env.ADOBE_CLIENT_ID,
        client_secret: process.env.ADOBE_CLIENT_SECRET,
        scope:
          'AdobeID,openid,read_organizations,additional_info.job_function,additional_info.projectedProductContext,additional_info.roles',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    // console.log('Token retrieved successfully:', response.data);
    adobeToken = response.data.access_token;
    tokenExpiresAt = Date.now() + response.data.expires_in * 1000;
  } catch (error) {
    console.error(
      'Failed to refresh Adobe token:',
      error.message,
      error.response.data,
    );
    throw new Error('Failed to authenticate with Adobe API');
  }
};

adobeApi.interceptors.request.use(
  async (config) => {
    if (!adobeToken || Date.now() >= tokenExpiresAt) {
      await refreshAdobeToken();
    }

    config.headers.Authorization = `Bearer ${adobeToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

module.exports = adobeApi;
