const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true, // Add index for faster filtering
    },
    purpose: {
      type: String,
      required: [true, 'Purpose is required'],
      trim: true,
    },
    commentDetail: {
      type: String,
      required: [true, 'Comment detail is required'],
      trim: true,
    },
    hashtag: {
      type: String,
      trim: true,
      index: true, // Add index for faster filtering
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

// Text index for search capabilities (optional)
commentSchema.index({ commentDetail: 'text' });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
