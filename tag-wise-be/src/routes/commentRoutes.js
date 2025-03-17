const express = require('express');
const commentController = require('../controllers/commentController'); // Adjust the path as necessary

const router = express.Router();

router.get('/', commentController.getAllComments);
router.post('/', commentController.createComment);
router.get('/:id', commentController.getCommentById);
router.put('/:id', commentController.updateCommentById);
router.delete('/:id', commentController.deleteCommentById);

module.exports = router;
