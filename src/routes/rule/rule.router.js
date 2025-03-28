const express = require('express');
const {
  httpValidateRule,
  httpGetListRule,
  httpGetRuleInProduction,
} = require('./rule.controller');

const ruleRouter = express.Router();

ruleRouter.get('/:libraryId/rules', httpGetListRule);
ruleRouter.get('/:ruleComponentId/in_production', httpGetRuleInProduction);
ruleRouter.post('/:ruleComponentId/validate', httpValidateRule);

module.exports = ruleRouter;
