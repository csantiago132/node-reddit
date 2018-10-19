require('dotenv').config();
const path = require('path');
const viewsFolder = path.join(__dirname, '..', 'views');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('express-flash');
const passportConfig = require('./passport-config');

module.exports = {
  init(app, express) {
    passportConfig.init(app);
    app.set('views', viewsFolder);
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, '..', 'assets')));
    app.use(expressValidator());
    app.use(
      session({
        secret: process.env.cookieSecret,
        resave: false,
        saveUninitialized: false,
        //set cookie to expire in 14 days
        cookie: { maxAge: 1.21e9 },
      }),
    );
    app.use(flash());
    app.use((request, response, next) => {
      response.locals.currentUser = request.user;
      next();
    });
  },
};
