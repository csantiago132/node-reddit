const bcrypt = require('bcryptjs');

module.exports = {
  ensureAuthenticated: (request, response, next) => {
    if (!request.user) {
      request.flash('notice', 'You must be signed in to do that.');
      return response.redirect('/users/sign_in');
    } else {
      next();
    }
  },

  comparePass: (userPassword, databasePassword) => {
    return bcrypt.compareSync(userPassword, databasePassword);
  },
};
