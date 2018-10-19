const express = require('express');
const router = express.Router();

const flairController = require('../controllers/flairController');

router
  .get('/flairs', flairController.index)
  .get('/flairs/new', flairController.new)
  .get('/flairs/:id', flairController.show)
  .get('/flairs/:id/edit', flairController.edit)
  .post('/flairs/create', flairController.create)
  .post('/flairs/create', flairController.create)
  .post('/flairs/:id/update', flairController.update)
  .post('/flairs/:id/destroy', flairController.destroy);

module.exports = router;
