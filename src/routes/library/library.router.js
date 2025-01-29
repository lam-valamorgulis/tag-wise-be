const express = require('express');
const {
  httpSearchLibrary,
  httpLibrarySummary,
} = require('./library.controller');

const libraryRouter = express.Router();

libraryRouter.get('/:id/summary', httpLibrarySummary);
libraryRouter.post('/search', httpSearchLibrary);

module.exports = libraryRouter;
