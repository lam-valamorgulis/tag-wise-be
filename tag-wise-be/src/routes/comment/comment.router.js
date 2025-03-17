const express = require('express');
const {
  httpAddComment,
  httpGetAllComments,
  httpUpdateComment,
  httpDeleteComment,
} = require('./comment.controller');

const commentRouter = express.Router();

commentRouter.get('/', httpGetAllComments);
commentRouter.post('/', httpAddComment);
commentRouter.put('/:id', httpUpdateComment);
commentRouter.delete('/:id', httpDeleteComment);

module.exports = commentRouter;
