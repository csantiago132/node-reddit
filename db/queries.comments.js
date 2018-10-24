const Comment = require('./models').Comment;
//const Post = require("./models").Post;
//const User = require("./models").User;
const Authorizer = require('../src/policies/comment');

module.exports = {
  createComment: (newComment, callback) => {
    return Comment.create(newComment)
      .then((comment) => {
        callback(null, comment);
      })
      .catch((error) => {
        callback(error);
      });
  },

  deleteComment: (request, callback) => {
    return Comment.findById(request.params.id).then((comment) => {
      const authorized = new Authorizer(request.user, comment).destroy();

      if (authorized) {
        comment.destroy();
        callback(null, comment);
      } else {
        request.flash('notice', 'You are not authorized to do that.');
        callback(401);
      }
    });
  },
};
