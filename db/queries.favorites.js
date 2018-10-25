const Favorite = require('./models').Favorite;
const Authorizer = require('../src/policies/favorite');

module.exports = {
  /* call create on the Favorite model with the id of the current user and the id of the post to create a favorite */
  createFavorite: (req, callback) => {
    return Favorite.create({
      postId: req.params.postId,
      userId: req.user.id,
    })
      .then((favorite) => {
        callback(null, favorite);
      })
      .catch((err) => {
        callback(err);
      });
  },

  /* look to see if a favorite exists for the user and the post in question. If we find a favorite, we verify that the user is authorized to delete the favorite by passing both to the policy instance. */
  deleteFavorite: (request, callback) => {
    const id = request.params.id;
    return Favorite.findById(id)
      .then((favorite) => {
        if (!favorite) {
          return callback('Favorite not found');
        }

        const authorized = new Authorizer(request.user, favorite).destroy();

        if (authorized) {
          Favorite.destroy({ where: { id } })
            .then((deletedRecordsCount) => {
              callback(null, deletedRecordsCount);
            })
            .catch((err) => {
              callback(err);
            });
        } else {
          request.flash('notice', 'You are not authorized to do that.');
          callback(401);
        }
      })
      .catch((error) => {
        callback(error);
      });
  },
};
