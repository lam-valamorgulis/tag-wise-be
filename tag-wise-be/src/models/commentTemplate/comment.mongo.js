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
commentSchema.index({ category: 1 }); // For filtering by category
commentSchema.index({ createdAt: -1 }); // For sorting by createdAt desc
commentSchema.index({ category: 1, createdAt: -1 }); // Compound index for category + createdAt queries

module.exports = mongoose.model('Comment', commentSchema);
