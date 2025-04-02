const { ACTION_CUSTOM_CODE } = require('../../utils/constants');

function validateActions(components, keyWords) {
  const result = {
    isContainedActions: false,
    extensions: [],
    type: [],
    settings: {
      method: ['JS'],
      containPII: false,
      inValidQuery: [],
      singleVariable: false,
    },
  };

  if (components.length === 0) return result;

  // Process each component
  components.forEach((component) => {
    const descriptorId = component.attributes.delegate_descriptor_id;

    const settings =
      typeof component.attributes.settings === 'string'
        ? JSON.parse(component.attributes.settings)
        : component.attributes.settings;

    // Check for custom code actions
    if (descriptorId === ACTION_CUSTOM_CODE) {
      result.isContainedActions = true;
    }

    // Get core extension
    const coreValue = descriptorId.split('::')[0];
    if (!result.extensions.includes(coreValue)) {
      result.extensions.push(coreValue);
    }

    // Get action type
    const type = descriptorId.split('::')[1];
    if (type === 'actions' && !result.type.includes(type)) {
      result.type.push(type);
    }

    // Check method/language
    if (settings.language === 'html') {
      result.settings.method.push('HTML');
    }
    const settingsStr = JSON.stringify(settings);

    // Check for PII
    const piiPatterns = [
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, // email
      /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/, // phone
      /\b(name|sex|gender)\b/i, // name, sex, gender
      /(md5|sha1|sha256|hash)\(/i, // hash functions
    ];

    result.settings.containPII = piiPatterns.some((pattern) =>
      pattern.test(settingsStr),
    );

    // Check for single variable declarations
    if (settings.source) {
      result.settings.singleVariable = /var\s+[a-zA-Z]\b/.test(settings.source);
    }

    // Enhanced check for invalid queries
    if (keyWords && keyWords.length > 0) {
      keyWords.forEach((keyword) => {
        // Create case-insensitive regex pattern for the keyword
        const keywordPattern = new RegExp(keyword, 'i');
        if (
          keywordPattern.test(settingsStr) &&
          !result.settings.inValidQuery.includes(keyword)
        ) {
          result.settings.inValidQuery.push(keyword);
        }
      });
    }
  });

  return result;
}

module.exports = {
  validateActions,
};
