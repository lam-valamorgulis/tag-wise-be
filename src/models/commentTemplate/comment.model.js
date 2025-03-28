const Comment = require('./comment.mongo');

class CommentError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'CommentError';
  }
}

const commentRepository = {
  // Find all comments with optional filtering, sorting, and search
  findAll: async ({
    category,
    searchTerm,
    sortBy = 'createdAt',
    order = 'desc',
    page = 1,
    limit = 10,
  } = {}) => {
    try {
      const query = {};

      if (category) {
        query.category = category;
      }

      if (searchTerm) {
        query.$text = { $search: searchTerm };
      }

      const validSortFields = ['createdAt', 'updatedAt', 'category', 'purpose'];
      if (!validSortFields.includes(sortBy)) {
        throw new CommentError('Invalid sort field', 400);
      }

      const sortOptions = { [sortBy]: order === 'desc' ? -1 : 1 };
      const skip = (page - 1) * limit;

      const [comments, total] = await Promise.all([
        Comment.find(query)
          .sort(sortOptions)
          .skip(skip)
          .limit(limit)
          .lean()
          .exec(),
        Comment.countDocuments(query),
      ]);

      return {
        comments,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new CommentError(error.message);
    }
  },

  // Create new comment
  create: async (commentData) => {
    try {
      if (
        !commentData.category ||
        !commentData.purpose ||
        !commentData.comment
      ) {
        throw new CommentError('Missing required fields', 400);
      }

      const comment = new Comment({
        ...commentData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const savedComment = await comment.save();
      return savedComment.toObject();
    } catch (error) {
      throw new CommentError(
        error.name === 'ValidationError'
          ? error.message
          : 'Failed to create comment',
        error.name === 'ValidationError' ? 400 : 500,
      );
    }
  },

  // Update existing comment
  updateById: async (id, updateData) => {
    try {
      if (!id) throw new CommentError('Comment ID is required', 400);

      const updatedData = {
        ...updateData,
        updatedAt: new Date(),
      };

      const comment = await Comment.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      }).exec();

      if (!comment) {
        throw new CommentError('Comment not found', 404);
      }

      return comment.toObject();
    } catch (error) {
      throw new CommentError(error.message, error.statusCode || 500);
    }
  },

  // Delete comment
  deleteById: async (id) => {
    try {
      if (!id) throw new CommentError('Comment ID is required', 400);

      const comment = await Comment.findByIdAndDelete(id).exec();

      if (!comment) {
        throw new CommentError('Comment not found', 404);
      }

      return { message: 'Comment deleted successfully' };
    } catch (error) {
      throw new CommentError(error.message, error.statusCode || 500);
    }
  },

  // Find comment by ID
  findById: async (id) => {
    try {
      if (!id) throw new CommentError('Comment ID is required', 400);

      const comment = await Comment.findById(id).lean().exec();

      if (!comment) {
        throw new CommentError('Comment not found', 404);
      }

      return comment;
    } catch (error) {
      throw new CommentError(error.message, error.statusCode || 500);
    }
  },

  // Search comments
  search: async (searchTerm, page = 1, limit = 10) => {
    try {
      if (!searchTerm) throw new CommentError('Search term is required', 400);

      const skip = (page - 1) * limit;

      const [comments, total] = await Promise.all([
        Comment.find(
          { $text: { $search: searchTerm } },
          { score: { $meta: 'textScore' } },
        )
          .sort({ score: { $meta: 'textScore' } })
          .skip(skip)
          .limit(limit)
          .lean()
          .exec(),
        Comment.countDocuments({ $text: { $search: searchTerm } }),
      ]);

      return {
        comments,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new CommentError(error.message);
    }
  },

  // Get comments by category with pagination
  findByCategory: async (category, page = 1, limit = 10) => {
    try {
      if (!category) throw new CommentError('Category is required', 400);

      const skip = (page - 1) * limit;

      const [comments, total] = await Promise.all([
        Comment.find({ category })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean()
          .exec(),
        Comment.countDocuments({ category }),
      ]);

      return {
        comments,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new CommentError(error.message);
    }
  },
};

module.exports = {
  commentRepository,
  CommentError,
};
