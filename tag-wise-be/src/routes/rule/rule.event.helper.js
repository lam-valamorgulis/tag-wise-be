const {
  getDelegateDescriptorIds,
  getUniqueExtensions,
  getUniqueDescriptorNames,
  checkDelayNavigationList,
} = require('../../utils/utils');

const { WINDOW_LOADED, CLICK_EVENT } = require('../../utils/constants');

function validateWindowLoad(
  components,
  isShopSection,
  dataElementComponents = [],
) {
  const result = {
    isContainedWL: false,
    extensions: [],
    type: [],
    order: '',
    isDataElementIncluded: {
      isInclude: dataElementComponents.length > 0,
      settings: [],
    },
  };

  // Early return if components array is empty
  if (components.length === 0) return result;

  const delegateIds = getDelegateDescriptorIds(components);

  // Check if 'window-loaded' is present
  result.isContainedWL = delegateIds.includes(WINDOW_LOADED);

  // Get unique extensions and descriptor names
  result.extensions = getUniqueExtensions(components);
  result.type = getUniqueDescriptorNames(components);

  // rules order
  const ruleOrders = components.map(
    (component) => component.attributes.rule_order,
  );
  const minRuleOrder = Math.min(...ruleOrders);
  result.order = minRuleOrder;

  // Validate data element inclusion based on isShopSection

  result.isDataElementIncluded.isInclude = isShopSection
    ? dataElementComponents.length > 0
    : true;

  const settingsList = dataElementComponents.map(
    (component) => component.attributes.settings,
  );

  result.isDataElementIncluded.settings = settingsList;

  return result;
}

function validateClicksComponent(components) {
  const result = {
    isContainedClick: false,
    extensions: [],
    type: [],
    order: '',
    delayNavigation: false,
  };

  if (components.length === 0) return result;
  const delegateIds = getDelegateDescriptorIds(components);
  result.isContainedClick = delegateIds.includes(CLICK_EVENT);
  result.extensions = getUniqueExtensions(components);
  result.type = getUniqueDescriptorNames(components);

  // rules order
  const ruleOrders = components.map(
    (component) => component.attributes.rule_order,
  );
  const minRuleOrder = Math.min(...ruleOrders);
  result.order = minRuleOrder;

  // Check for delay navigation setting
  const settingsList = components.map(
    (component) => component.attributes.settings,
  );
  result.delayNavigation = checkDelayNavigationList(settingsList);

  return result;
}

function validateOtherComponents(components) {
  const result = {
    isContainedOther: false,
    extensions: [],
    type: [],
    order: '',
  };

  if (components.length === 0) return result;
  const delegateIds = getDelegateDescriptorIds(components);
  result.isContainedOther = delegateIds.length > 0;
  result.extensions = getUniqueExtensions(components);
  result.type = getUniqueDescriptorNames(components);
  const ruleOrders = components.map(
    (component) => component.attributes.rule_order,
  );
  const minRuleOrder = Math.min(...ruleOrders);
  result.order = minRuleOrder;
  return result;
}

module.exports = {
  validateWindowLoad,
  validateClicksComponent,
  validateOtherComponents,
};
