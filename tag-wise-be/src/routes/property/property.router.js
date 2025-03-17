const express = require('express');
const {
  httpGetDetailProperty,
  httpGetListProperty,
} = require('./property.controller');
const { validatePropertyId } = require('./property.middleware');

const propertyRouter = express.Router();

propertyRouter.get('/detail/:id', validatePropertyId, httpGetDetailProperty);
propertyRouter.post('/search', httpGetListProperty);

module.exports = propertyRouter;
