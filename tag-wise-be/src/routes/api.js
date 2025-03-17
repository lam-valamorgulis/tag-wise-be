const express = require('express');

const commentRouter = require('./comment/comment.router');
const libraryRouter = require('./library/library.router');
const propertyRouter = require('./property/property.router');
const ruleRouter = require('./rule/rule.router');
const accountProfileRouter = require('./account_profile/account_profile.router');

const api = express.Router();

api.use('/library', libraryRouter);
api.use('/property', propertyRouter);
api.use('/rule', ruleRouter);
api.use('/comments', commentRouter);
api.use('/account_profile', accountProfileRouter);

module.exports = api;
