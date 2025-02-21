const { mappingProfile } = require('../data/mappingProfile');

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
  // Regex to capture the third segment, allowing parentheses and spaces
  const regex = /^[^-]*-[^-]*-((?:[^( -]+|\([^)]*\))+)/;
  const match = inputString.match(regex);

  // Return the captured group or null if not found
  return match ? match[1] : null;
}
function validateRuleName(ruleName) {
  const ruleRegex =
    /^([^-]+)-([^-]+)-((?:[^( -]+|\([^)]*\))+)-([^-]+)-([^-]+)$/;
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
    siteSection: ['B2C', 'B2B', 'CS', 'SHOP'].includes(
      siteSection.toUpperCase(),
    ),
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
    valideName: {
      userType: validations.userType ? 'pass' : 'fail',
      siteSection: validations.siteSection ? 'pass' : 'fail',
      purpose,
      trackingPage,
      trackingFeature,
    },
  };
}

// function validateDateRangeComponents(components, isHqRule) {
//   const result = {
//     isContainDateRange: false,
//     validComponents: [],
//     invalidComponents: [],
//     totalChecked: 0,
//   };

//   const now = new Date();
//   const maxValidDate = new Date(now);
//   maxValidDate.setMonth(maxValidDate.getMonth() + 2);
//   maxValidDate.setDate(maxValidDate.getDate() + 14);

//   components.forEach((component) => {
//     if (isHqRule) {
//       const validationResult = {
//         id: component.id,
//         isContainDateRange: false,
//         name: component.attributes.name,
//         endDate: 'N/A',
//         isValid: true,
//         maxAllowedDate: 'N/A',
//       };
//       result.validComponents.push(validationResult);
//     }
//     if (
//       component.attributes.delegate_descriptor_id ===
//       'core::conditions::date-range'
//     ) {
//       try {
//         const settings = JSON.parse(component.attributes.settings);
//         const endDate = new Date(settings.end);

//         const isValid = endDate <= maxValidDate;

//         const validationResult = {
//           isContainDateRange: true,
//           id: component.id,
//           name: component.attributes.name,
//           endDate: settings.end,
//           isValid: isValid,
//           maxAllowedDate: maxValidDate.toISOString(),
//         };

//         if (isValid) {
//           result.validComponents.push(validationResult);
//         } else {
//           result.invalidComponents.push(validationResult);
//         }
//         result.totalChecked += 1;
//       } catch (error) {
//         console.error(
//           `Error parsing settings for component ${component.id}:`,
//           error,
//         );
//       }
//     }
//   });

//   return result;
// }

function validateDateRangeComponents(components, isHqRule) {
  const result = {
    isContainDateRange: false,
    validComponents: [],
    invalidComponents: [],
    totalChecked: 0,
  };

  // First, check if any component contains 'core::conditions::date-range'
  const dateRangeComponents = components.filter(
    (component) =>
      component.attributes.delegate_descriptor_id ===
      'core::conditions::date-range',
  );

  // Update isContainDateRange based on found components
  result.isContainDateRange = dateRangeComponents.length > 0;

  // If it's an HQ rule, bypass validation and return early
  if (isHqRule) {
    result.validComponents = components.map((component) => ({
      id: component.id,
      isContainDateRange: result.isContainDateRange,
      name: component.attributes.name,
      endDate: 'N/A',
      isValid: true,
      maxAllowedDate: 'N/A',
      reason: 'HQ rule: Date range validation bypassed.',
    }));
    return result;
  }

  // Set max allowed date (current date + 2 months + 14 days)
  const now = new Date();
  const maxValidDate = new Date(now);
  maxValidDate.setMonth(maxValidDate.getMonth() + 2);
  maxValidDate.setDate(maxValidDate.getDate() + 14);

  // Process date-range components
  dateRangeComponents.forEach((component) => {
    try {
      const settings = JSON.parse(component.attributes.settings);
      const endDate = new Date(settings.end);
      const isValid = endDate <= maxValidDate;

      const validationResult = {
        id: component.id,
        isContainDateRange: true,
        name: component.attributes.name,
        endDate: settings.end,
        isValid,
        maxAllowedDate: maxValidDate.toISOString(),
        reason: isValid
          ? 'Valid: End date is within the allowed range.'
          : 'Invalid: End date exceeds the maximum allowed range.',
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
  });

  return result;
}

// function validateCookieConditions(components, isEU) {
//   const requiredDescriptor = 'core::conditions::custom-code';
//   const requiredPattern =
//     'document.cookie.match(/\\bnotice_gdpr_prefs=[^:]*2,3[^:]*:/)';

//   // Step 1: Filter components with the correct delegate_descriptor_id
//   const filteredComponents = components.filter(
//     (component) =>
//       component.attributes.delegate_descriptor_id === requiredDescriptor,
//   );

//   // Step 2: Validate the filtered components
//   return filteredComponents.map((component) => {
//     const baseResult = {
//       id: component.id,
//       validateCookies: {
//         isCustomCode: 'pass',
//         containsCookieCheck: 'fail',
//         isEUCompliant: 'fail',
//         _details: {
//           descriptor: component.attributes.delegate_descriptor_id,
//           isEUParameter: isEU,
//         },
//       },
//     };

//     try {
//       // Parse settings
//       const settings = JSON.parse(component.attributes.settings);
//       const sourceCode =
//         (settings.source ? settings.source.toLowerCase() : '') || '';

//       // Check for the required cookie pattern
//       const hasCookieCheck = sourceCode.includes(requiredPattern.toLowerCase());
//       baseResult.validateCookies.containsCookieCheck = hasCookieCheck
//         ? 'pass'
//         : 'fail';

//       // Final EU compliance check
//       baseResult.validateCookies.isEUCompliant =
//         isEU && baseResult.validateCookies.containsCookieCheck === 'pass'
//           ? 'pass'
//           : 'fail';

//       return baseResult;
//     } catch (error) {
//       console.error(`Error processing component ${component.id}:`, error);
//       baseResult.validateCookies._details.error = error.message;
//       return baseResult;
//     }
//   });
// }

function validateCookieConditions(components, isEU) {
  const requiredDescriptor = 'core::conditions::custom-code';
  const requiredPattern =
    'document.cookie.match(/\\bnotice_gdpr_prefs=[^:]*2,3[^:]*:/)';

  const result = {
    validComponents: [],
    invalidComponents: [],
    bypassedComponents: [],
    totalChecked: components.length,
  };

  // If not EU, bypass consent check
  if (!isEU) {
    result.bypassedComponents.push({
      isValid: true,
      reason: 'Bypass: Not Required Cookies Check',
    });
    return result;
  }

  // Step 1: Filter components with the correct delegate_descriptor_id (custom-code)
  const filteredComponents = components.filter(
    (component) =>
      component.attributes.delegate_descriptor_id === requiredDescriptor,
  );

  // If no components match, fail with the reason: "Require EU but don't have custom code"
  if (filteredComponents.length === 0) {
    result.invalidComponents.push({
      isValid: false,
      reason: 'Fail: Require EU but don’t have custom code.',
    });
    return result;
  }

  // Step 2: Validate the filtered components
  filteredComponents.forEach((component) => {
    const baseResult = {
      id: component.id,
      validateCookies: {
        isCustomCode: true,
        containsCookieCheck: false,
        isEUCompliant: false,
        _details: {
          descriptor: component.attributes.delegate_descriptor_id,
          isEUParameter: isEU,
        },
      },
    };

    try {
      // Parse settings
      const settings = JSON.parse(component.attributes.settings);
      const sourceCode = settings.source ? settings.source.toLowerCase() : '';

      // Check for the required cookie pattern
      const hasCookieCheck = sourceCode.includes(requiredPattern.toLowerCase());
      baseResult.validateCookies.containsCookieCheck = hasCookieCheck;

      // Final EU compliance check
      baseResult.validateCookies.isEUCompliant =
        isEU && baseResult.validateCookies.containsCookieCheck;

      // Store validation result
      if (baseResult.validateCookies.isEUCompliant) {
        result.validComponents.push(baseResult);
      } else {
        baseResult.validateCookies._details.reason =
          'Fail: EU compliance check failed.';
        result.invalidComponents.push(baseResult);
      }
    } catch (error) {
      console.error(`Error processing component ${component.id}:`, error);
      baseResult.validateCookies._details.error = error.message;
      result.invalidComponents.push(baseResult);
    }
  });

  return result;
}

function validatePathContainKeyWords(components, keyWords) {
  const result = {
    conditionElement: [],
    isContainQueryPath: false,
    validComponents: [],
    invalidComponents: [],
    totalChecked: 0,
    bypassedComponents: [],
  };

  result.conditionElement = [
    ...new Set(
      components
        .map((component) => component.attributes.delegate_descriptor_id)
        .filter((id) => id.startsWith('core::conditions')),
    ),
  ];

  const filteredComponents = components.filter(
    (component) =>
      component.attributes.delegate_descriptor_id ===
      'core::conditions::path-and-querystring',
  );

  // If no components match, add bypass reason only once
  if (filteredComponents.length === 0) {
    result.bypassedComponents.push({
      isValid: true,
      reason: 'Bypass: Does not contain path-and-query string condition.',
    });
    return result;
  }

  result.isContainQueryPath = true;

  filteredComponents.forEach((component) => {
    try {
      const settings = JSON.parse(component.attributes.settings); // Parse settings JSON
      const paths = settings.paths || []; // Extract paths, default to an empty array

      // Check if any path value contains a keyword
      const containsKeyword = paths.some((pathObj) =>
        keyWords.some((keyword) => pathObj.value.includes(keyword)),
      );

      const validationResult = {
        id: component.id,
        name: component.attributes.name,
        paths: paths.map((pathObj) => pathObj.value),
        containsKeyword: containsKeyword,
        reason: containsKeyword
          ? 'Invalid: Path contains restricted keywords.'
          : 'Valid: Path does not contain restricted keywords.',
      };

      if (containsKeyword) {
        result.invalidComponents.push(validationResult);
      } else {
        result.validComponents.push(validationResult);
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
    isRuleContainWL: false,
    eventComponents: [],
    validComponents: [],
    invalidComponents: [],
    totalChecked: components.length,
  };

  // Collect all delegate_descriptor_id values that contain "core::events:"
  result.eventComponents = components
    .map((component) => component.attributes.delegate_descriptor_id)
    .filter((id) => id.includes('core::events:'));

  const hasWindowLoad = result.eventComponents.includes(
    'core::events::window-loaded',
  );
  result.isRuleContainWL = hasWindowLoad;

  const hasDataElementChange = result.eventComponents.includes(
    'core::events::data-element-change',
  );

  if (isShopSection) {
    if (hasWindowLoad && hasDataElementChange) {
      result.validComponents.push({
        isValid: true,
        reason:
          'Rule valid shop section: both window-loaded and data-element-change present.',
      });
    } else if (hasWindowLoad && !hasDataElementChange) {
      result.invalidComponents.push({
        isValid: false,
        reason: 'Rule invalid shop section: Have WL event - Missing DEC',
      });
    } else if (!hasWindowLoad) {
      result.validComponents.push({
        isValid: true,
        reason: "Rule valid shop section: rule doesn't contain WL",
      });
    }
  } else {
    result.validComponents.push({
      isValid: true,
      reason:
        'Rule valid non-shop section: core event present or non-window-loaded',
    });
  }

  return result;
}
function validateRuleOrder(components, isHqRules) {
  const result = {
    checkComponents: [],
    totalChecked: components.length,
  };

  if (isHqRules) {
    result.checkComponents.push({
      isValid: true,
      reason: 'Is HQ rule, bypass check rule order.',
    });
  } else {
    const allRuleOrderGreater50 = components.every(
      (component) => component.attributes.rule_order >= 50,
    );

    if (allRuleOrderGreater50) {
      result.checkComponents.push({
        isValid: true,
        reason: 'All components have rule_order >= 50.',
      });
    } else {
      result.checkComponents.push({
        isValid: false,
        reason: 'Rules contain rule_order < 50.',
      });
    }
  }

  return result;
}

function validateCookiesEvent(components, isRequiredConsent) {
  const result = {
    validatedComponents: [],
    eventComponents: [],
    totalChecked: components.length,
  };

  if (!isRequiredConsent) {
    result.validatedComponents.push({
      isValid: true,
      reason:
        'Not required consent mode, bypassing consent mode check on Event.',
    });
  } else {
    const cookiesEventComponents = components.filter(
      (component) =>
        component.attributes.delegate_descriptor_id ===
        'core::events::direct-call',
    );

    result.eventComponents = cookiesEventComponents.map(
      (component) => component.attributes.delegate_descriptor_id,
    );

    const hasCookiesEvent = cookiesEventComponents.length > 0;

    result.validatedComponents.push({
      isValid: hasCookiesEvent,
      reason: hasCookiesEvent
        ? 'Rule valid: event contains a cookies component.'
        : 'Rule invalid: event does not include a cookies component.',
    });
  }

  return result;
}

function validateActions(components) {
  const result = {
    isImplementedByCustomCode: true,
    validComponents: [],
    totalChecked: 0,
  };

  // Filter only core::actions::custom-code components
  const customCodeComponents = components.filter(
    (component) =>
      component.attributes.delegate_descriptor_id ===
      'core::actions::custom-code',
  );

  if (customCodeComponents.length === 0) {
    result.isImplementedByCustomCode = false;
    return result;
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

// Function to query the mapping data

// Function to query the mapping data
function queryMapping(orgCategory, requestKey) {
  if (Object.prototype.hasOwnProperty.call(mappingProfile, orgCategory)) {
    const categoryData = mappingProfile[orgCategory];
    if (Object.prototype.hasOwnProperty.call(categoryData, requestKey)) {
      return categoryData[requestKey];
    }
  }
  return 'No matching data found.';
}

module.exports = {
  extractStringBetweenUnderscoreAndDash,
  extractThirdSegment,
  validateRuleName,
  validateDateRangeComponents,
  validateCookieConditions,
  validatePathContainKeyWords,
  validateWindowLoad,
  validateActions,
  validateRuleOrder,
  validateCookiesEvent,
  queryMapping,
};
