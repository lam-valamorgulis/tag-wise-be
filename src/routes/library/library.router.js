const express = require('express');
const {
  httpSearchLibrary,
  httpLibrarySummary,
  httpBulkCreateLibrary,
} = require('./library.controller');

const libraryRouter = express.Router();

libraryRouter.get('/:id/summary', httpLibrarySummary);
libraryRouter.post('/search', httpSearchLibrary);
libraryRouter.post('/bulk_create', httpBulkCreateLibrary);

module.exports = libraryRouter;
