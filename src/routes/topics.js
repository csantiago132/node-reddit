const express = require('express');
const router = express.Router();

const topicController = require('../controllers/topicController');

router.get('/topics', topicController.index);

router.get('/topics/new', topicController.new);

module.exports = router;
