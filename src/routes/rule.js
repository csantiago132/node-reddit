const express = require('express');
const router = express.Router();

const ruleController = require('../controllers/ruleController');

router.get('/rule', ruleController.index);

module.exports = router;
