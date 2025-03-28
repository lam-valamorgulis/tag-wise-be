const express = require('express');
const {
  httpAddComment,
  httpGetAllComments,
  httpUpdateComment,
  httpDeleteComment,
  httpSearchComments,
  httpGetCommentsByCategory,
} = require('./comment.controller');

const commentRouter = express.Router();

// Combined search and filter endpoint
commentRouter.get('/', httpGetAllComments);
commentRouter.get('/search', httpSearchComments);
commentRouter.get('/category', httpGetCommentsByCategory);
commentRouter.post('/', httpAddComment);
commentRouter.put('/:id', httpUpdateComment);
commentRouter.delete('/:id', httpDeleteComment);

module.exports = commentRouter;
