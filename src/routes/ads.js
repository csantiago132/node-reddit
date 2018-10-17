const express = require('express');
const router = express.Router();

const adsController = require('../controllers/adsController');

router.get('/ads', adsController.index);

router.get('/ads/new', adsController.new);

router.post('/ads/create', adsController.create);

module.exports = router;
