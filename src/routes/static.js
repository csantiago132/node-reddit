const express = require('express');
const router = express.Router();

router.get('/', (res) => {
  res.send('Welcome to Node-Reddit');
});

module.exports = router;
