const { DELAY_NAVIGATION, GDPR } = require('./constants');

function extractStringBetweenUnderscoreAndDash(input) {
  // Regular expression to capture two groups:
  // Group 1: characters between "_" and "-"
  // Group 2: characters immediately after "-" until a whitespace or "("
  const regex = /_([^-]+)-([^\s(]+)/;
  const match = input.match(regex);

  if (match && match[1] && match[2]) {
    let code;
    // If group2 (after dash) contains a dot, remove dots and use that
    if (match[2].includes('.')) {
      code = match[2].replace(/\./g, '');
    } else {
      // Otherwise, take group1.
      // If group1 contains an underscore (e.g., "hybris_vn"), split and use the last part.
      const parts = match[1].split('_');
      code = parts[parts.length - 1];
    }
    return code.toLowerCase();
  }

  // Return null if no valid match is found.
  return null;
}

function extractThirdSegment(inputString) {
  // Regex to capture the third segment, allowing parentheses and spaces
  const regex = /^[^-]*-[^-]*-((?:[^( -]+|\([^)]*\))+)/;
  const match = inputString.match(regex);

  // Return the captured group or null if not found
  return match ? match[1] : null;
}

// Function to extract delegate_descriptor_id values
function getDelegateDescriptorIds(components) {
  return components.map(
    (component) => component.attributes.delegate_descriptor_id,
  );
}

// Function to extract unique prefixes before the first '::'
function getUniqueExtensions(components) {
  const delegateDescriptorIds = getDelegateDescriptorIds(components);
  const prefixes = delegateDescriptorIds.map((descriptor) =>
    descriptor.split('::')[0].replace(/^"|"$/g, ''),
  );
  return [...new Set(prefixes)];
}

// Function to extract unique descriptor names (e.g., 'window-loaded', 'date-range')
function getUniqueDescriptorNames(components) {
  const delegateDescriptorIds = getDelegateDescriptorIds(components);
  const names = delegateDescriptorIds.map((descriptor) =>
    descriptor.split('::').pop(),
  );
  return [...new Set(names)];
}

function hasAnchorDelay(settingsString) {
  try {
    if (!settingsString || typeof settingsString !== 'string') {
      return false;
    }
    const settings = JSON.parse(settingsString);
    return (
      DELAY_NAVIGATION in settings &&
      settings.anchorDelay !== undefined &&
      settings.anchorDelay !== null
    );
  } catch (error) {
    console.error('Error parsing settings:', error.message);
    return false;
  }
}

function checkDelayNavigationList(settingsList) {
  if (!Array.isArray(settingsList) || settingsList.length === 0) {
    return false;
  }

  // Check if any element has anchorDelay
  return settingsList.some((settingsString) => hasAnchorDelay(settingsString));
}

// Function to parse and extract end dates, returning sorted YYYY-MM-DD strings
function getSortedEndDates(settingsList) {
  if (!Array.isArray(settingsList) || settingsList.length === 0) {
    return [];
  }

  const endDates = settingsList
    .map((item) => {
      try {
        if (typeof item !== 'string' || !item) return null;
        const parsed = JSON.parse(item);
        return parsed.end.split('T')[0]; // Extract YYYY-MM-DD directly
      } catch (error) {
        console.error('Error parsing JSON:', error.message);
        return null;
      }
    })
    .filter((date) => date !== null);

  endDates.sort((a, b) => a.localeCompare(b));
  return endDates;
}

// Function to categorize rule components
function categorizeRuleComponents(components) {
  const categorized = {
    conditions: [],
    events: [],
    actions: [],
  };

  components.forEach((component) => {
    const descriptor = component.attributes.delegate_descriptor_id;

    if (descriptor.startsWith('core::conditions::')) {
      categorized.conditions.push(component);
    } else if (descriptor.startsWith('core::events::')) {
      categorized.events.push(component);
    } else if (descriptor.startsWith('core::actions::')) {
      categorized.actions.push(component);
    }
  });

  return categorized;
}

// Function to filter rule components by delegate_descriptor_id
function filterByDelegateDescriptorId(components, descriptorId) {
  return components.filter(
    (component) => component.attributes.delegate_descriptor_id === descriptorId,
  );
}

function parseSettings(jsonString) {
  try {
    if (typeof jsonString !== 'string' || !jsonString) {
      return null;
    }
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing settings JSON:', error.message);
    return null;
  }
}

function isWithinThreeDays(dateString) {
  try {
    // Parse the input date
    const targetDate = new Date(dateString);
    const now = new Date();

    // Calculate the absolute difference in milliseconds
    const diffMs = Math.abs(targetDate - now);

    // Convert 3 days to milliseconds (3 days * 24 hours * 60 minutes * 60 seconds * 1000 ms)
    const threeDaysMs = 2 * 24 * 60 * 60 * 1000;

    // Return true if difference is less than or equal to 3 days
    return diffMs <= threeDaysMs;
  } catch (error) {
    console.error('Error parsing date:', error.message);
    return false; // Return false if date is invalid
  }
}
function containsGdprCookieCheck(components) {
  return components.some(
    ({ attributes: { settings } }) =>
      typeof settings === 'string' && settings.includes(GDPR),
  );
}

module.exports = {
  extractStringBetweenUnderscoreAndDash,
  extractThirdSegment,
  checkDelayNavigationList,
  categorizeRuleComponents,
  filterByDelegateDescriptorId,
  getDelegateDescriptorIds,
  getUniqueExtensions,
  getUniqueDescriptorNames,
  getSortedEndDates,
  parseSettings,
  isWithinThreeDays,
  containsGdprCookieCheck,
};
