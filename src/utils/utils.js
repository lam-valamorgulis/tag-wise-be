function extractStringBetweenUnderscoreAndDash(input) {
  // Regular expression to match the string between _ and -
  const regex = /_([^-]+)-/;
  const match = input.match(regex);

  // If a match is found, return the captured group (the string between _ and -)
  if (match && match[1]) {
    return match[1].toLowerCase();
  }

  // If no match is found, return null or an appropriate default value
  return null;
}

function extractThirdSegment(inputString) {
  // Regex to match the third segment between hyphens
  const regex = /^[^-]*-[^-]*-([^-]+)/;
  const match = inputString.match(regex);

  // Return the captured group or null if not found
  return match ? match[1] : null;
}

function validateRuleName(ruleName) {
  // Regex to split rule into 5 components
  const ruleRegex = /^([^-]+)-([^-]+)-([^-]+)-([^-]+)-([^-]+)$/;
  const match = ruleName.match(ruleRegex);

  if (!match) {
    return {
      isValid: false,
      checkName: {
        userType: 'fail',
        siteSection: 'fail',
        purpose: null,
        trackingPage: null,
        trackingFeature: null,
      },
    };
  }

  // Extract components
  const [, userType, siteSection, purpose, trackingPage, trackingFeature] =
    match;

  // Validation checks
  const validations = {
    userType: userType.startsWith('LC'),
    siteSection: ['B2C', 'B2B', 'CS', 'shop'].includes(siteSection),
  };

  return {
    isValid: Object.values(validations).every((v) => v),
    components: {
      userType,
      siteSection,
      purpose,
      trackingPage,
      trackingFeature,
    },
    checkName: {
      userType: validations.userType ? 'pass' : 'fail',
      siteSection: validations.siteSection ? 'pass' : 'fail',
      purpose: purpose,
      trackingPage: trackingPage,
      trackingFeature: trackingFeature,
    },
  };
}

function validateDateRangeComponents(components, isHqRule) {
  const result = {
    validComponents: [],
    invalidComponents: [],
    totalChecked: 0,
  };

  const now = new Date();
  const maxValidDate = new Date(now);
  maxValidDate.setMonth(maxValidDate.getMonth() + 2);
  maxValidDate.setDate(maxValidDate.getDate() + 14);

  components.forEach((component) => {
    if (isHqRule) {
      const validationResult = {
        id: component.id,
        name: component.attributes.name,
        endDate: 'N/A',
        isValid: true,
        maxAllowedDate: 'N/A',
      };
      result.validComponents.push(validationResult);
    }
    if (
      component.attributes.delegate_descriptor_id ===
      'core::conditions::date-range'
    ) {
      try {
        const settings = JSON.parse(component.attributes.settings);
        const endDate = new Date(settings.end);

        const isValid = endDate <= maxValidDate;

        const validationResult = {
          id: component.id,
          name: component.attributes.name,
          endDate: settings.end,
          isValid: isValid,
          maxAllowedDate: maxValidDate.toISOString(),
        };

        if (isValid) {
          result.validComponents.push(validationResult);
        } else {
          result.invalidComponents.push(validationResult);
        }
        result.totalChecked += 1;
      } catch (error) {
        console.error(
          `Error parsing settings for component ${component.id}:`,
          error,
        );
      }
    }
  });

  return result;
}

function validateDateCookieConditions(components, isEU) {
  const requiredDescriptor = 'core::conditions::custom-code';
  const requiredPattern =
    'document.cookie.match(/\\bnotice_gdpr_prefs=[^:]*2,3[^:]*:/)';

  // Step 1: Filter components with the correct delegate_descriptor_id
  const filteredComponents = components.filter(
    (component) =>
      component.attributes.delegate_descriptor_id === requiredDescriptor,
  );

  // Step 2: Validate the filtered components
  return filteredComponents.map((component) => {
    const baseResult = {
      id: component.id,
      validateCookies: {
        isCustomCode: 'pass', // Already filtered, so this is always pass
        containsCookieCheck: 'fail',
        isEUCompliant: 'fail',
        _details: {
          descriptor: component.attributes.delegate_descriptor_id,
          isEUParameter: isEU,
        },
      },
    };

    try {
      // Parse settings
      const settings = JSON.parse(component.attributes.settings);
      const sourceCode =
        (settings.source ? settings.source.toLowerCase() : '') || '';

      // Check for the required cookie pattern
      const hasCookieCheck = sourceCode.includes(requiredPattern.toLowerCase());
      baseResult.validateCookies.containsCookieCheck = hasCookieCheck
        ? 'pass'
        : 'fail';

      // Final EU compliance check
      baseResult.validateCookies.isEUCompliant =
        isEU && baseResult.validateCookies.containsCookieCheck === 'pass'
          ? 'pass'
          : 'fail';

      return baseResult;
    } catch (error) {
      console.error(`Error processing component ${component.id}:`, error);
      baseResult.validateCookies._details.error = error.message;
      return baseResult;
    }
  });
}

function validatePathContainKeyWords(components, keyWords) {
  const filteredComponents = components.filter(
    (component) =>
      component.attributes.delegate_descriptor_id ===
      'core::conditions::path-and-querystring',
  );

  const result = {
    validComponents: [],
    invalidComponents: [],
    totalChecked: 0,
  };

  filteredComponents.forEach((component) => {
    try {
      const settings = JSON.parse(component.attributes.settings); // Parse the settings JSON
      const paths = settings.paths || []; // Extract `paths` or default to an empty array

      // Check if any `paths.value` contains a keyword
      const containsKeyword = paths.some((pathObj) =>
        keyWords.some((keyword) => pathObj.value.includes(keyword)),
      );

      const validationResult = {
        id: component.id,
        name: component.attributes.name,
        paths: paths.map((pathObj) => pathObj.value),
        containsKeyword: containsKeyword,
      };

      if (!containsKeyword) {
        result.validComponents.push(validationResult);
      } else {
        result.invalidComponents.push(validationResult);
      }

      result.totalChecked += 1;
    } catch (error) {
      console.error(
        `Error parsing settings for component ${component.id}:`,
        error,
      );
    }
  });

  return result;
}

function validateWindowLoad(components, isShopSection) {
  const result = {
    validComponents: [],
    invalidComponents: [],
    totalChecked: 1,
  };

  const hasWindowLoad = components.some(
    (component) =>
      component.attributes.delegate_descriptor_id ===
      'core::events::window-loaded',
  );

  const hasDataElementChange = components.some(
    (component) =>
      component.attributes.delegate_descriptor_id ===
      'core::events::data-element-change',
  );

  if (isShopSection && hasWindowLoad && hasDataElementChange) {
    result.validComponents.push({
      isValid: true,
      reason:
        'Valid shop section with both window-loaded and data-element-change events',
    });
  } else if (!isShopSection && hasWindowLoad) {
    result.validComponents.push({
      isValid: true,
      reason: 'Valid non-shop section with window-loaded event',
    });
  } else {
    const reason = isShopSection
      ? 'Shop section requires both window-loaded and data-element-change events'
      : 'Non-shop section requires a window-loaded event';

    result.invalidComponents.push({
      isValid: false,
      reason,
    });
  }

  return result;
}

function validateActions(components) {
  const result = {
    validComponents: [],
    invalidComponents: [],
    totalChecked: 0,
  };

  // Filter only core::actions::custom-code components
  const customCodeComponents = components.filter(
    (component) =>
      component.attributes.delegate_descriptor_id ===
      'core::actions::custom-code',
  );

  if (customCodeComponents.length === 0) {
    return {
      isValid: false,
      reason: 'No core::actions::custom-code component found',
    };
  }

  const piiPatterns = [
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/, // Email pattern
    /\b\d{10,15}\b/, // Phone numbers (basic digit-based, adjust as needed)
    /\b(sex|gender)\b/i, // Sex/Gender identifiers
  ];

  customCodeComponents.forEach((component) => {
    result.totalChecked += 1;

    try {
      const settings = JSON.parse(component.attributes.settings);
      const sourceCode = settings.source || '';

      const containsPII = piiPatterns.some((pattern) =>
        pattern.test(sourceCode),
      );

      if (containsPII) {
        result.invalidComponents.push({
          id: component.id,
          isValid: false,
          reason: 'Settings contain PII (email, phone, or gender-related info)',
        });
      } else {
        result.validComponents.push({
          id: component.id,
          isValid: true,
          reason: 'Valid custom code without PII',
        });
      }
    } catch (error) {
      result.invalidComponents.push({
        id: component.id,
        isValid: false,
        reason: 'Error parsing settings',
      });
    }
  });

  return result;
}

module.exports = {
  extractStringBetweenUnderscoreAndDash,
  extractThirdSegment,
  validateRuleName,
  validateDateRangeComponents,
  validateDateCookieConditions,
  validatePathContainKeyWords,
  validateWindowLoad,
  validateActions,
};
