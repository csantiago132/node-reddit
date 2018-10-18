const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router
  .get('/topics/:topicId/posts/new', postController.new)
  .get('/topics/:topicId/posts/:id', postController.show)
  .post('/topics/:topicId/posts/create', postController.create);

module.exports = router;
