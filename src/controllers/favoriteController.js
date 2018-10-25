const favoriteQueries = require('../../db/queries.favorites.js');

module.exports = {
  /* checks if there is a user signed in and if so, calls the createFavorite method of queries.favorites.js with the request. If createFavorite returns an error, we load a flash message. Otherwise, the user must not be signed in and we present an error saying so. */
  create: (request, response) => {
    if (request.user) {
      favoriteQueries.createFavorite(request, (error) => {
        if (error) {
          request.flash('error', error);
        }
      });
    } else {
      request.flash('notice', 'You must be signed in to do that.');
    }
    response.redirect(request.headers.referer);
  },
  /* checks if there is a user signed in and if so, calls the deleteFavorite method of queries.favorites.js with the request. */
  destroy: (request, response) => {
    if (request.user) {
      favoriteQueries.deleteFavorite(request, (error) => {
        if (error) {
          request.flash('error', error);
        }
        response.redirect(request.headers.referer);
      });
    } else {
      request.flash('notice', 'You must be signed in to do that.');
      response.redirect(request.headers.referer);
    }
  },
};
