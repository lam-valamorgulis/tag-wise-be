const {
  getRuleComponentsAdobeApi,
  getRulesLibraryAdobeApi,
} = require('../../models/rule.model');
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

  if (!ruleName) {
    return res.status(400).json({
      error: 'Missing required parameter: ruleName',
    });
  }

  const checkName = validateRuleName(ruleName);

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

    const checkCookies = validateDateCookieConditions(rulesLibrary.data, isEU);

    const checkPathString = validatePathContainKeyWords(
      rulesLibrary.data,
      keyWord,
    );

    const checkWindowLoad = validateWindowLoad(
      rulesLibrary.data,
      isShopSection,
    );

    const checkActions = validateActions(rulesLibrary.data);

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
