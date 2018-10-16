const express = require('express');
const router = express.Router();

const adsController = require('../controllers/adsController');

router.get('/ads', adsController.index);

module.exports = router;
