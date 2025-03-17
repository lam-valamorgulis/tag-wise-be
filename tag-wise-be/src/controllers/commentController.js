const commentRepository = require('../models/commenTemplate/comment.model');

const getAllComments = async (req, res) => {
  try {
    const comments = await commentRepository.findAll();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createComment = async (req, res) => {
  try {
    const comment = await commentRepository.create(req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    const comment = await commentRepository.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCommentById = async (req, res) => {
  try {
    const comment = await commentRepository.updateById(req.params.id, req.body);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCommentById = async (req, res) => {
  try {
    const comment = await commentRepository.deleteById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllComments,
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
