const express = require('express');
const router = express.Router();
const validation = require('./validation');

const postController = require('../controllers/postController');

router
  .get('/topics/:topicId/posts/new', postController.new)
  .get('/topics/:topicId/posts/:id', postController.show)
  .get('/topics/:topicId/posts/:id/edit', postController.edit)
  .post('/topics/:topicId/posts/:id/destroy', postController.destroy)
  .post(
    '/topics/:topicId/posts/create',
    validation.validatePosts,
    postController.create,
  )
  .post(
    '/topics/:topicId/posts/:id/update',
    validation.validatePosts,
    postController.update,
  );

module.exports = router;
