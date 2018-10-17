const express = require('express');
const router = express.Router();

const topicController = require('../controllers/topicController');

router
  .get('/topics', topicController.index)
  .get('/topics/new', topicController.new)
  .get('/topics/:id', topicController.show)
  .get('/topics/:id/edit', topicController.edit)
  .post('/topics/create', topicController.create)
  .post('/topics/:id/destroy', topicController.destroy)
  .post('/topics/:id/update', topicController.update);

module.exports = router;
