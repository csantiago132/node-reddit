const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/posts', postController.index);

module.exports = router;
