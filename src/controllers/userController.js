const userQueries = require('../../db/queries.users.js');
const passport = require('passport');

module.exports = {
  signUp: (request, response) => {
    response.render('users/sign_up');
  },

  create: (request, response) => {
    let newUser = {
      email: request.body.email,
      password: request.body.password,
      passwordConfirmation: request.body.passwordConfirmation,
    };
    // user not def at first, if needed, use:
    // userQueries.createUser(newUser, (error, user)
    userQueries.createUser(newUser, (error) => {
      if (error) {
        request.flash('error', error);
        response.redirect('/users/sign_up');
      } else {
        passport.authenticate('local')(request, response, () => {
          request.flash('notice', "You've successfully signed in!");
          response.redirect('/');
        });
      }
    });
  },

  signInForm: (request, response) => {
    response.render('users/sign_in');
  },

  signIn: (request, response) => {
    passport.authenticate('local')(request, response, () => {
      if (!request.user) {
        request.flash('notice', 'Sign in failed. Please try again.');
        response.redirect('/users/sign_in');
      } else {
        request.flash('notice', "You've successfully signed in!");
        response.redirect('/');
      }
    });
  },
};
