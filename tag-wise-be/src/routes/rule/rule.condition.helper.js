const {
  getDelegateDescriptorIds,
  getUniqueExtensions,
  getUniqueDescriptorNames,
  getSortedEndDates,
  categorizeRuleComponents,
  parseSettings,
  isWithinThreeDays,
  containsGdprCookieCheck,
} = require('../../utils/utils');

const {
  getListRulesRevisonAdobeApi,
  getRuleComponentsAdobeApi,
} = require('../../models/rule.model');

const {
  DATE_RANGE_CONDITION,
  PATH_AND_QUERYSTRING,
  PATH,
} = require('../../utils/constants');

function validateDateRangeComponents(components) {
  const result = {
    isContainedDateRangeComponent: false,
    extensions: [],
    type: [],
    settings: {
      isValid: false,
      expectedEndDate: [],
      maxAllowedDate: [],
    },
  };

  if (components.length === 0) return result;
  const delegateIds = getDelegateDescriptorIds(components);
  result.isContainedDateRangeComponent =
    delegateIds.includes(DATE_RANGE_CONDITION);
  result.extensions = getUniqueExtensions(components);
  result.type = getUniqueDescriptorNames(components);

  // Check date setting
  const settingsList = components.map(
    (component) => component.attributes.settings,
  );
  result.settings.expectedEndDate = getSortedEndDates(settingsList);

  // Set max allowed date (current date + 2 months + 14 days)
  const now = new Date();
  const maxValidDate = new Date(now);
  maxValidDate.setMonth(maxValidDate.getMonth() + 2);
  maxValidDate.setDate(maxValidDate.getDate() + 14);
  result.settings.maxAllowedDate.push(maxValidDate.toISOString().split('T')[0]);

  // Validate and convert expected dates to Date objects
  const validDates = result.settings.expectedEndDate
    .map((dateStr) => {
      const date = new Date(`${dateStr}T00:00:00Z`);
      // Check if the date is valid by comparing formatted output to input
      const formattedDate = date.toISOString().split('T')[0];
      return formattedDate === dateStr ? date : null;
    })
    .filter((date) => date !== null); // Keep only valid dates

  // If no valid dates, consider it invalid
  if (validDates.length === 0) {
    result.settings.isValid = false;
  }
  // Check if all valid dates are < maxValidDate
  result.settings.isValid = validDates.every((date) => date < maxValidDate);

  return result;
}

async function validateRuleInProductionComponents(ruleID) {
  const result = {
    isUrgentRules: false,
    currentEndDateInProduction: [],
  };

  if (!ruleID) return result;

  const getRulesInProduction = await getListRulesRevisonAdobeApi(ruleID);
  if (getRulesInProduction.length === 0) return result;

  const getRulesComponentInProduction = await getRuleComponentsAdobeApi(
    getRulesInProduction[0].id,
  );

  const categorizedComponents = categorizeRuleComponents(
    getRulesComponentInProduction.data,
  );

  const dateRangeComponents = categorizedComponents.conditions.filter(
    (component) =>
      component.attributes.delegate_descriptor_id === DATE_RANGE_CONDITION,
  );

  if (dateRangeComponents.length === 0) {
    result.isUrgentRules = false;
    return result;
  }

  const settings = parseSettings(dateRangeComponents[0].attributes.settings);

  // Convert the end date string to a Date object
  const endDate = new Date(settings.end);

  // Validate if the date is valid
  if (Number.isNaN(endDate.getTime())) {
    console.error('Invalid date format:', settings.end);
    return result;
  }

  // Format the date as YYYY-MM-DD
  result.currentEndDateInProduction.push(endDate.toISOString().split('T')[0]);

  result.isUrgentRules = isWithinThreeDays(endDate);
  return result;
}

function validateTrustArcConditions(components, isRequiredConsent) {
  const result = {
    byPass: true,
    isContainedTrustArc: false,
  };
  if (!isRequiredConsent) return result;

  result.byPass = false;
  result.isContainedTrustArc =
    isRequiredConsent && containsGdprCookieCheck(components);

  return result;
}

function validatePathContainKeyWords(components, keywords) {
  const result = {
    isContainPathQuery: false,
    settings: {
      inValidQuery: [],
      configurable: [],
    },
  };

  // Return early if no components or invalid components
  if (!components || !Array.isArray(components) || components.length === 0) {
    return result;
  }

  // Process each component
  components.forEach((component) => {
    const {
      attributes: {
        delegate_descriptor_id: delegateDescriptorId,
        settings,
        negate,
      },
    } = component;

    // Parse settings JSON string
    let parsedSettings;
    try {
      parsedSettings = parseSettings(settings);
    } catch (e) {
      return result; // Return default result if parsing fails
    }

    // Handle both path-based conditions
    if (
      delegateDescriptorId === PATH_AND_QUERYSTRING ||
      delegateDescriptorId === PATH
    ) {
      result.isContainPathQuery = true;

      // Extract path values
      let pathValues = [];
      if (parsedSettings.paths && Array.isArray(parsedSettings.paths)) {
        pathValues = parsedSettings.paths.map((path) => path.value);
      }

      // Add to configurable array with the delegate_descriptor_id as key
      const configValues = negate ? ['NOT'].concat(pathValues) : pathValues;
      result.settings.configurable.push({
        [delegateDescriptorId]: configValues,
      });

      // Validate against keywords if provided
      if (keywords && Array.isArray(keywords) && keywords.length > 0) {
        pathValues.forEach((value) => {
          keywords.forEach((keyword) => {
            if (value.toLowerCase().includes(keyword.toLowerCase())) {
              if (!result.settings.inValidQuery.includes(keyword)) {
                result.settings.inValidQuery.push(keyword);
              }
            }
          });
        });
      }
    }
  });

  return result;
}

module.exports = {
  validateDateRangeComponents,
  validateTrustArcConditions,
  validatePathContainKeyWords,
  validateRuleInProductionComponents,
};
