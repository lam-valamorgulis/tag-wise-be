const Comment = require('./comment.mongo');

const commentRepository = {
  findAll: async (filter = {}) => Comment.find(filter).lean().exec(),

  create: async (commentData) => {
    const comment = new Comment(commentData);
    return comment.save();
  },

  updateById: async (id, updateData) =>
    Comment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec(),

  deleteById: async (id) => Comment.findByIdAndDelete(id).exec(),

  findById: async (id) => Comment.findById(id).exec(),
};

module.exports = commentRepository;
