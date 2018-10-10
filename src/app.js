const express = require('express');
const app = express();
const config = require('./config/route-config.js');

config.init(app);

module.exports = app;
