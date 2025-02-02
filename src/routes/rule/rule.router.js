const express = require('express');
const { httpValidateRule, httpGetListRule } = require('./rule.controller');

const ruleRouter = express.Router();

ruleRouter.get('/:libraryId/rules', httpGetListRule);
ruleRouter.post('/:ruleComponentId/validate', httpValidateRule);

module.exports = ruleRouter;
