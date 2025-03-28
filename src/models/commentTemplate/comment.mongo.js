const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      '3rd Party Tag',
      'Account Creation',
      'Maintenance',
      'Enhancement',
      'General',
    ],
  },
  purpose: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

// Add text index for search functionality
commentSchema.index({ purpose: 'text', comment: 'text' });

module.exports = mongoose.model('Comment', commentSchema);
