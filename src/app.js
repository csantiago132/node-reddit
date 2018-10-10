const express = require('express');
const appConfig = require('./config/main-config.js');
const config = require('./config/route-config.js');
const app = express();

appConfig.init(app, express);
config.init(app);

module.exports = app;
