const express = require('express');
const router = express.Router();

const adsController = require('../controllers/adsController');

router
  .get('/ads', adsController.index)
  .get('/ads/new', adsController.new)
  .get('/ads/:id', adsController.show)
  .get('/ads/:id/edit', adsController.edit)
  .post('/ads/create', adsController.create)
  .post('/ads/:id/destroy', adsController.destroy)
  .post('/ads/:id/update', adsController.update);

module.exports = router;
