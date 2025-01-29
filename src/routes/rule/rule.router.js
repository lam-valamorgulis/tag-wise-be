const express = require('express');
const { httpValidateRule } = require('./rule.controller');

const ruleRouter = express.Router();

ruleRouter.post('/:ruleComponentId/validate', httpValidateRule);

module.exports = ruleRouter;
