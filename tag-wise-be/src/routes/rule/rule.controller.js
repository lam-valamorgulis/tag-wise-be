const {
  getRuleComponentsAdobeApi,
  getRulesLibraryAdobeApi,
  getListRulesRevisonAdobeApi,
} = require('../../models/rule.model');

const {
  validateWindowLoad,
  validateClicksComponent,
  validateOtherComponents,
} = require('./rule.event.helper');

const { validateRuleName } = require('./rule.name.helper');

const {
  validateTrustArcConditions,
  validateDateRangeComponents,
  validatePathContainKeyWords,
  validateRuleInProductionComponents,
} = require('./rule.condition.helper');

const {
  validateActions,
  validateOtherActions,
} = require('./rule.action.helper');

const { categorizeRuleComponents } = require('../../utils/utils');

const {
  WINDOW_LOADED,
  DATA_ELEMET_CHANGE,
  CLICK_EVENT,
  DATE_RANGE_CONDITION,
  CUSTOM_CODE,
  PATH_AND_QUERYSTRING,
  PATH,
  ACTION_CUSTOM_CODE,
} = require('../../utils/constants');

async function httpValidateRule(req, res) {
  const ruleId = req.params.ruleComponentId;

  const { ruleName, isRequiredConsent, isShopSection, keywords } = req.body;

  if (!ruleName) {
    return res.status(400).json({
      error: 'Missing required parameter: ruleName',
    });
  }

  // 1.Check Name
  const checkName = validateRuleName(ruleName);

  try {
    // get list rules components
    const rulesLibrary = await getRuleComponentsAdobeApi(ruleId);

    if (!rulesLibrary) {
      return res.status(404).json({
        error: 'Library not found',
      });
    }

    // Categorize the components
    const categorizedComponents = categorizeRuleComponents(rulesLibrary.data);
    // 2.Check Events
    //  a.check window loading
    const windowLoadComponents = categorizedComponents.events.filter(
      (component) =>
        component.attributes.delegate_descriptor_id === WINDOW_LOADED,
    );
    const dataElementComponents = categorizedComponents.events.filter(
      (component) =>
        component.attributes.delegate_descriptor_id === DATA_ELEMET_CHANGE,
    );

    const checkWindowLoad = validateWindowLoad(
      windowLoadComponents,
      isShopSection,
      dataElementComponents,
    );

    // b.check click
    const clickComponents = categorizedComponents.events.filter(
      (component) =>
        component.attributes.delegate_descriptor_id === CLICK_EVENT,
    );
    const checkClicks = validateClicksComponent(clickComponents);

    // c.check other events
    const EXCLUDED_EVENTS = [WINDOW_LOADED, DATA_ELEMET_CHANGE, CLICK_EVENT];
    const otherComponents = categorizedComponents.events.filter(
      (component) =>
        !EXCLUDED_EVENTS.includes(component.attributes.delegate_descriptor_id),
    );
    const checkOtherEvents = validateOtherComponents(otherComponents);

    // 3.Check conditions
    // a. check date ranges
    const dateRangeComponents = categorizedComponents.conditions.filter(
      (component) =>
        component.attributes.delegate_descriptor_id === DATE_RANGE_CONDITION,
    );
    const checkDateRange = validateDateRangeComponents(dateRangeComponents);

    // b.check current date of rules in production
    const checkDateRuleInProduction =
      await validateRuleInProductionComponents(ruleId);

    // c. check trust arc conditions
    const trustArcComponents = categorizedComponents.conditions.filter(
      (component) =>
        component.attributes.delegate_descriptor_id === CUSTOM_CODE,
    );
    const checkTrustArcCondition = validateTrustArcConditions(
      trustArcComponents,
      isRequiredConsent,
    );

    // d. check path string
    const pathStringComponents = categorizedComponents.conditions.filter(
      (component) =>
        component.attributes.delegate_descriptor_id === PATH_AND_QUERYSTRING ||
        component.attributes.delegate_descriptor_id === PATH,
    );
    const checkPathString = validatePathContainKeyWords(
      pathStringComponents,
      keywords,
    );

    // 4. Check
    // a. check custom code actions
    const actionCodeComponents = categorizedComponents.actions.filter(
      (component) =>
        component.attributes.delegate_descriptor_id === ACTION_CUSTOM_CODE,
    );

    const checkActions = validateActions(actionCodeComponents, keywords);
    // b. check other actions

    const otherActionComponents = categorizedComponents.others;

    const checkOtherActions = validateOtherActions(otherActionComponents);

    return res.status(200).json({
      checkName: checkName,
      checkEvents: {
        checkWindowLoad,
        checkClicks,
        checkOtherEvents,
      },
      checkCondition: {
        checkDateRange,
        checkDateRuleInProduction,
        checkTrustArcCondition,
        checkPathString,
      },
      checkActions: {
        checkActions,
        checkOtherActions,
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
      ruleItem.enable = rule.attributes.enabled;
      ruleItem.revision_number = rule.attributes.revision_number;
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

async function httpGetRuleInProduction(req, res) {
  const ruleId = req.params.ruleComponentId;

  try {
    const rulesInProduction = await getListRulesRevisonAdobeApi(ruleId);

    if (!rulesInProduction) {
      return res.status(404).json({
        error: 'Library not found',
      });
    }

    return res.status(200).json(rulesInProduction);
  } catch (error) {
    console.error('Error fetching library details:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}
module.exports = { httpValidateRule, httpGetListRule, httpGetRuleInProduction };
