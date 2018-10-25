const bcrypt = require('bcryptjs');
const User = require('./models').User;
const Post = require('./models').Post;
const Comment = require('./models').Comment;

module.exports = {
  createUser: (newUser, callback) => {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    return User.create({
      email: newUser.email,
      password: hashedPassword,
    })
      .then((user) => {
        callback(null, user);
      })
      .catch((error) => {
        callback(error);
      });
  },

  getUser: (id, callback) => {
    let result = {};
    User.findById(id).then((user) => {
      if (!user) {
        callback(404);
      } else {
        result['user'] = user;
        Post.scope({ method: ['lastFiveFor', id] })
          .all()
          .then((posts) => {
            result['posts'] = posts;
            Comment.scope({ method: ['lastFiveFor', id] })
              .all()
              .then((comments) => {
                result['comments'] = comments; // Store the result in the object
                // Execute the scope on User to get tall favorites made by the user.
                User.scope({ method: ['allFavoritedPosts', id] })
                  .all()
                  .then((favorites) => {
                    let userFavorites = JSON.parse(JSON.stringify(favorites));
                    let favoritePostsId = [];
                    userFavorites[0].favorites.forEach((favorite) => {
                      favoritePostsId.push(favorite.postId);
                    });
                    var allFavorites = [];
                    Post.findAll().then((allPosts) => {
                      allPosts.forEach((thisPost) => {
                        if (favoritePostsId.includes(thisPost.id)) {
                          allFavorites.push({
                            id: thisPost.id,
                            title: thisPost.title,
                            topicId: thisPost.topicId,
                          });
                        }
                      });
                      result['allFavorites'] = allFavorites;
                      callback(null, result);
                    });
                  });
              })
              .catch((error) => {
                callback(error);
              });
          });
      }
    });
  },
};
