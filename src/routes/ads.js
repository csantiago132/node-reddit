const express = require('express');
const router = express.Router();

const adsController = require('../controllers/adsController');

router.get('/ads', adsController.index);

router.get('/ads/new', adsController.new);

router.get('/ads/:id', adsController.show);

router.get('/ads/:id/edit', adsController.edit);

router.post('/ads/create', adsController.create);

router.post('/ads/:id/destroy', adsController.destroy);

module.exports = router;
