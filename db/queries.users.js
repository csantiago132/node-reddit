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
                result['comments'] = comments;
                callback(null, result);
              })
              .catch((error) => {
                callback(error);
              });
          });
      }
    });
  },
};
