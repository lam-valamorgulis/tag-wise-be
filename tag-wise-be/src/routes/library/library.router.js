const express = require('express');
const {
  httpSearchLibrary,
  httpLibrarySummary,
  httpBulkCreateLibrary,
  httpGetLibraryExtension,
  httpGetLibraryDataElement,
} = require('./library.controller');

const libraryRouter = express.Router();

libraryRouter.get('/:id/summary', httpLibrarySummary);
libraryRouter.get('/:id/extension', httpGetLibraryExtension);
libraryRouter.get('/:id/data_element', httpGetLibraryDataElement);
libraryRouter.post('/search', httpSearchLibrary);
libraryRouter.post('/bulk_create', httpBulkCreateLibrary);

module.exports = libraryRouter;
