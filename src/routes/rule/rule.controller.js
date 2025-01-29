const { getRuleComponentsAdobeApi } = require('../../models/rule.model');
const {
  validateRuleName,
  validateDateRangeComponents,
  validateDateCookieConditions,
  validatePathContainKeyWords,
  validateWindowLoad,
  validateActions,
} = require('../../utils/utils');

async function httpValidateRule(req, res) {
  const ruleId = req.params.ruleComponentId;

  const { ruleName, isEU, isHqRule, keyWord, isShopSection } = req.body;

  // console.log(`Rule ID: ${ruleId}`);
  // console.log(`Rule name: ${ruleName}`);
  // console.log(`RC id: ${ruleComponentId}`);

  const checkName = validateRuleName(ruleName);
  // console.log(checkName);

  try {
    // Simulate fetching data from a database or external service
    const rulesLibrary = await getRuleComponentsAdobeApi(ruleId);

    if (!rulesLibrary) {
      return res.status(404).json({
        error: 'Library not found',
      });
    }
    const dateRangeComponents = validateDateRangeComponents(
      rulesLibrary.data,
      isHqRule,
    );
    // console.log(dateRangeComponents);

    const checkCookies = validateDateCookieConditions(rulesLibrary.data, isEU);
    // console.log(checkCookies);

    const checkPathString = validatePathContainKeyWords(
      rulesLibrary.data,
      keyWord,
    );
    console.log(checkPathString);

    const checkWindowLoad = validateWindowLoad(
      rulesLibrary.data,
      isShopSection,
    );
    console.log(checkWindowLoad);

    const checkActions = validateActions(rulesLibrary.data);
    console.log(checkActions);

    return res.status(200).json({
      checkName: checkName,
      checkCondition: {
        dateRangeComponents,
        checkCookies,
        checkPathString,
        checkWindowLoad,
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

module.exports = { httpValidateRule };
