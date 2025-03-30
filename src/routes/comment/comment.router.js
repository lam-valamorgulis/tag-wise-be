const express = require('express');
const {
  httpAddComment,
  httpGetAllComments,
  httpUpdateComment,
  httpDeleteComment,
  httpSearchWithFilters,
} = require('./comment.controller');

const commentRouter = express.Router();

// Combined search and filter endpoint
commentRouter.get('/', httpGetAllComments);
commentRouter.get('/search', httpSearchWithFilters);
commentRouter.post('/', httpAddComment);
commentRouter.put('/:id', httpUpdateComment);
commentRouter.delete('/:id', httpDeleteComment);

module.exports = commentRouter;
