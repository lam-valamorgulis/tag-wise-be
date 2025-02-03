const {
  getRuleComponentsAdobeApi,
  getRulesLibraryAdobeApi,
} = require('../../models/rule.model');
const {
  validateRuleName,
  validateDateRangeComponents,
  validateCookieConditions,
  validatePathContainKeyWords,
  validateWindowLoad,
  validateActions,
  validateRuleOrder,
  validateCookiesEvent,
} = require('../../utils/utils');

async function httpValidateRule(req, res) {
  const ruleId = req.params.ruleComponentId;

  const { ruleName, isHqRules, isRequiredConsent, isShopSection, keyWord } =
    req.body;

  if (!ruleName) {
    return res.status(400).json({
      error: 'Missing required parameter: ruleName',
    });
  }

  // Check Name
  const checkName = validateRuleName(ruleName);

  try {
    // Simulate fetching data from a database or external service
    const rulesLibrary = await getRuleComponentsAdobeApi(ruleId);

    if (!rulesLibrary) {
      return res.status(404).json({
        error: 'Library not found',
      });
    }

    // Check Events
    const checkWindowLoad = validateWindowLoad(
      rulesLibrary.data,
      isShopSection,
    );

    const checkRuleOrder = validateRuleOrder(rulesLibrary.data, isHqRules);

    const checkCookiesEvent = validateCookiesEvent(
      rulesLibrary.data,
      isRequiredConsent,
    );

    // Check conditions
    const checkDateRange = validateDateRangeComponents(
      rulesLibrary.data,
      isHqRules,
    );

    const checkPathString = validatePathContainKeyWords(
      rulesLibrary.data,
      keyWord,
    );

    const checkCookiesCondition = validateCookieConditions(
      rulesLibrary.data,
      isRequiredConsent,
    );

    // check actions
    const checkActions = validateActions(rulesLibrary.data);

    return res.status(200).json({
      checkName: checkName,
      checkEvents: {
        checkWindowLoad,
        checkRuleOrder,
        checkCookiesEvent,
      },
      checkCondition: {
        checkDateRange,
        checkPathString,
        checkCookiesCondition,
      },
      checkActions: {
        checkActions,
      },
    });
  } catch (error) {
    console.error('Error fetching rule component details:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

async function httpGetListRule(req, res) {
  const libId = req.params.libraryId;

  try {
    const rulesLibrary = await getRulesLibraryAdobeApi(libId);

    if (!rulesLibrary) {
      return res.status(404).json({
        error: 'Library not found',
      });
    }

    const rulesList = [];
    rulesLibrary.data.forEach((rule) => {
      const ruleItem = {};
      ruleItem.name = rule.attributes.name;
      ruleItem.id = rule.id;
      rulesList.push(ruleItem);
    });

    return res.status(200).json(rulesList);
  } catch (error) {
    console.error('Error fetching library details:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

module.exports = { httpValidateRule, httpGetListRule };
