const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../db/models').User;

const authHelper = require('../auth/helpers');
module.exports = {
  init: (app) => {
    /* initialize Passport and tell it to use sessions to keep track of authenticated users. */
    app.use(passport.initialize());
    app.use(passport.session());

    /* use the local strategy. Passport looks for properties called  username and password in the body of the request by default, so we pass an option called usernameField to specify what property to use instead
    */
    passport.use(
      new LocalStrategy(
        {
          usernameField: 'email',
        },
        (email, password, done) => {
          User.findOne({
            where: { email },
          }).then((user) => {
            if (!user || !authHelper.comparePass(password, user.password)) {
              return done(null, false, {
                message: 'Invalid email or password',
              });
            }
            return done(null, user);
          });
        },
      ),
    );
    /* serializeUser takes the authenticated user's ID and stores it in the session */
    passport.serializeUser((user, callback) => {
      callback(null, user.id);
    });
    /* deserializeUser takes the ID stored in the session and returns the user associated with it */
    passport.deserializeUser((id, callback) => {
      User.findById(id)
        .then((user) => {
          callback(null, user);
        })
        .catch((error) => {
          callback(error);
        });
    });
  },
};
