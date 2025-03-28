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

module.exports = {
  validateRuleName,
};
