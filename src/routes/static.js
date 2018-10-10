const express = require('express');
const staticController = require('../controllers/staticController');
const router = express.Router();

router.get('/', staticController.index);

router.get('/marco', (request, response) => {
  response.send('polo');
});

module.exports = router;
