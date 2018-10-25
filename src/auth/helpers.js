const bcrypt = require('bcryptjs');

module.exports = {
  /* ensureAuthenticated can be passed as a middleware function placed before protected requests that require authentication. When Passport successfully authenticates a user, it places the user in req.user. */
  ensureAuthenticated: (request, response, next) => {
    if (!request.user) {
      request.flash('notice', 'You must be signed in to do that.');
      return response.redirect('/users/sign_in');
    } else {
      next();
    }
  },
  /* call comparePass with the plain-text password sent in the request and the hashed password retrieved by the strategy. It passes both to a bcrypt function that decrypts the hashed password and compares it with the plain-text version
 */
  comparePass: (userPassword, databasePassword) => {
    return bcrypt.compareSync(userPassword, databasePassword);
  },
};
