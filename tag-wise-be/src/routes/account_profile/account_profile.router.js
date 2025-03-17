const express = require('express');
const { httpAccountProfile } = require('./account_profile.controller');

const accountProfileRouter = express.Router();

accountProfileRouter.post('/', httpAccountProfile);

module.exports = accountProfileRouter;
