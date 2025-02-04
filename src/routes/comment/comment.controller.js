// comment.controller.js
const Comment = require('../../models/commenTemplate/comment.mongo');

async function httpGetAllComments(req, res) {
  try {
    // Decode URL-encoded parameters
    const category = req.query.category
      ? decodeURIComponent(req.query.category)
      : undefined;
    const hashtag = req.query.hashtag
      ? decodeURIComponent(req.query.hashtag)
      : undefined;

    const filter = {};
    if (category) filter.category = category;
    if (hashtag) filter.hashtag = hashtag;

    const comments = await Comment.find(filter).lean();
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch comments',
      message: error.message,
    });
  }
}

async function httpAddComment(req, res) {
  try {
    const { category, purpose, commentDetail, hashtag } = req.body;

    if (!category || !purpose || !commentDetail) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Category, purpose, and comment detail are required',
      });
    }

    const newComment = new Comment({
      category,
      purpose,
      commentDetail,
      hashtag: hashtag || '',
    });

    const savedComment = await newComment.save();
    return res.status(201).json(savedComment);
  } catch (error) {
    return res.status(400).json({
      error: 'Comment creation failed',
      message: error.message,
    });
  }
}

async function httpUpdateComment(req, res) {
  try {
    const commentId = req.params.id;
    const { category, purpose, commentDetail, hashtag } = req.body;

    if (!category || !purpose || !commentDetail) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Category, purpose, and comment detail are required',
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { category, purpose, commentDetail, hashtag },
      { new: true, runValidators: true },
    );

    if (!updatedComment) {
      return res.status(404).json({
        error: 'Comment not found',
        message: 'No comment found with that ID',
      });
    }

    return res.status(200).json(updatedComment);
  } catch (error) {
    return res.status(400).json({
      error: 'Comment update failed',
      message: error.message,
    });
  }
}

async function httpDeleteComment(req, res) {
  try {
    const commentId = req.params.id;
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({
        error: 'Comment not found',
        message: 'No comment found with that ID',
      });
    }

    return res.status(200).json({
      message: 'Comment deleted successfully',
      deletedComment,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Comment deletion failed',
      message: error.message,
    });
  }
}

module.exports = {
  httpGetAllComments,
  httpAddComment,
  httpUpdateComment,
  httpDeleteComment,
};
