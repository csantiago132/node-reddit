const express = require('express');
const staticController = require('../controllers/staticController');
const router = express.Router();

router
  .get('/', staticController.index)
  .get('/marco', (request, response) => {
    response.send('polo');
  })
  .get('/about', (request, response) => {
    response.send('About Us');
  });

module.exports = router;
