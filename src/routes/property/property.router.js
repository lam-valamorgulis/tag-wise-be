const express = require('express');
const { httpGetDetailProperty } = require('./property.controller');
const { validatePropertyId } = require('./property.middleware');

const propertyRouter = express.Router();

propertyRouter.get('/detail/:id', validatePropertyId, httpGetDetailProperty);

module.exports = propertyRouter;
