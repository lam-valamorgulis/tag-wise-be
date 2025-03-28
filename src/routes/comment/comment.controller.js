/* eslint-disable arrow-body-style */
/* eslint-disable radix */
const {
  commentRepository,
  CommentError,
} = require('../../models/commentTemplate/comment.model');

// Constants
const VALID_CATEGORIES = [
  '3rd Party Tag',
  'Account Creation',
  'Maintenance',
  'Enhancement',
  'General',
];

const VALID_SORT_FIELDS = ['createdAt', 'updatedAt', 'category', 'purpose'];

// Validation helpers
const validateCategory = (category) => {
  if (!category) {
    throw new CommentError('Category is required', 400);
  }
  if (!VALID_CATEGORIES.includes(category)) {
    throw new CommentError('Invalid category', 400);
  }
};

const validatePagination = (page, limit) => ({
  page: Math.max(1, parseInt(page)),
  limit: Math.min(100, Math.max(1, parseInt(limit))),
});

const validateSortField = (sortBy) => {
  if (sortBy && !VALID_SORT_FIELDS.includes(sortBy)) {
    throw new CommentError('Invalid sort field', 400);
  }
};

// Response helpers
const handleError = (res, error, defaultMessage) => {
  console.error(`${error.name || 'Error'}: ${error.message}`);
  return res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || defaultMessage,
  });
};

const sendResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

// Controller functions
async function httpGetAllComments(req, res) {
  try {
    const {
      category,
      search: searchTerm,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    validateSortField(sortBy);
    if (category) validateCategory(category);
    const pagination = validatePagination(page, limit);

    const result = await commentRepository.findAll({
      category,
      searchTerm,
      sortBy,
      order,
      ...pagination,
    });

    return sendResponse(res, result);
  } catch (error) {
    return handleError(res, error, 'Failed to fetch comments');
  }
}

async function httpAddComment(req, res) {
  try {
    const { category, purpose, comment, createdBy } = req.body;

    if (!category || !purpose || !comment || !createdBy) {
      throw new CommentError('Missing required fields', 400);
    }

    validateCategory(category);

    const newComment = await commentRepository.create({
      category,
      purpose,
      comment,
      createdBy,
    });

    return sendResponse(res, newComment, 201);
  } catch (error) {
    return handleError(res, error, 'Failed to add comment');
  }
}

async function httpUpdateComment(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      throw new CommentError('Comment ID is required', 400);
    }

    const updateData = {
      ...req.body,
      updatedAt: new Date(),
    };

    if (updateData.category) {
      validateCategory(updateData.category);
    }

    const updatedComment = await commentRepository.updateById(id, updateData);
    return sendResponse(res, updatedComment);
  } catch (error) {
    return handleError(res, error, 'Failed to update comment');
  }
}

async function httpDeleteComment(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      throw new CommentError('Comment ID is required', 400);
    }

    const result = await commentRepository.deleteById(id);
    return sendResponse(res, result);
  } catch (error) {
    return handleError(res, error, 'Failed to delete comment');
  }
}

async function httpSearchComments(req, res) {
  try {
    const { searchTerm: encodedSearchTerm, page = 1, limit = 10 } = req.query;

    if (!encodedSearchTerm) {
      throw new CommentError('Search term is required', 400);
    }

    // Decode the search term
    const searchTerm = decodeURIComponent(encodedSearchTerm);

    const pagination = validatePagination(page, limit);
    const result = await commentRepository.search(
      searchTerm,
      pagination.page,
      pagination.limit,
    );

    return sendResponse(res, result);
  } catch (error) {
    return handleError(res, error, 'Failed to search comments');
  }
}

async function httpGetCommentsByCategory(req, res) {
  try {
    const { category: encodedCategory, page = 1, limit = 10 } = req.query;

    // Decode the category parameter
    const category = decodeURIComponent(encodedCategory);

    validateCategory(category);
    const pagination = validatePagination(page, limit);

    const result = await commentRepository.findByCategory(
      category,
      pagination.page,
      pagination.limit,
    );

    return sendResponse(res, result);
  } catch (error) {
    return handleError(res, error, 'Failed to fetch comments by category');
  }
}

module.exports = {
  httpGetAllComments,
  httpAddComment,
  httpUpdateComment,
  httpDeleteComment,
  httpSearchComments,
  httpGetCommentsByCategory,
};
