const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  response.send('Welcome to Node-Reddit');
});

router.get('/marco', (request, response) => {
  response.send('polo');
});

module.exports = router;
