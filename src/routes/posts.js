const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/topics/:topicId/posts/new', postController.new);

module.exports = router;
