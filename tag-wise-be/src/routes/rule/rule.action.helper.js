const { ACTION_CUSTOM_CODE } = require('../../utils/constants');

function validateActions(components, keywords) {
  const result = {
    isContainedActions: false,
    extensions: [],
    type: [],
    settings: {
      method: [],
      containPII: [],
      inValidQuery: [],
      singleVariable: [],
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
    } else {
      result.settings.method.push('JAVASCRIPT');
    }

    // Convert source code to string for analysis
    const settingsStr = JSON.stringify(settings.source);

    // Check for PII
    // Define PII patterns with labels
    const piiPatterns = [
      {
        label: 'Email',
        pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
      },
      { label: 'Phone Number', pattern: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/ },
      { label: 'Mail', pattern: /\b(mail|email)\b/i },
      { label: 'Gender', pattern: /\b(sex|gender|female|male)\b/i },
      { label: 'Hash Functions', pattern: /(md5|sha1|sha256|hash)\(/i },
    ];

    // Check for PII and store detected types
    piiPatterns.forEach(({ label, pattern }) => {
      if (pattern.test(settingsStr)) {
        result.settings.containPII.push(label);
      }
    });

    // Update the single variable check
    if (keywords && keywords.length > 0) {
      keywords.forEach((keyword) => {
        // Escape special regex characters in the keyword
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Create case-insensitive regex pattern for the escaped keyword
        const keywordPattern = new RegExp(escapedKeyword, 'i');

        if (
          keywordPattern.test(settingsStr) &&
          !result.settings.inValidQuery.includes(keyword)
        ) {
          result.settings.inValidQuery.push(keyword);
        }
      });
    }

    // Enhanced check for invalid queries
  });

  return result;
}

function validateOtherActions(otherActionComponents) {
  const result = {
    isContainedOtherActions: otherActionComponents.length > 0,
    extensions: [],
  };

  otherActionComponents.forEach((component) => {
    const descriptorId = component.attributes.delegate_descriptor_id;
    result.extensions.push(descriptorId);
  });

  return result;
}

module.exports = {
  validateActions,
  validateOtherActions,
};
