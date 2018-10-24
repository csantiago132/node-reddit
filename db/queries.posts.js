const Post = require('./models').Post;
const Comment = require('./models').Comment;
const User = require('./models').User;
const Vote = require('./models').Vote;
const Authorizer = require('../src/policies/application');
const Favorite = require('./models').Favorite;

module.exports = {
  addPost: (newPost, callback) => {
    return Post.create(newPost)
      .then((post) => {
        callback(null, post);
      })
      .catch((error) => {
        callback(error);
      });
  },

  getPost: (id, callback) => {
    return Post.findById(id, {
      include: [
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
            },
          ],
        },
        {
          model: Vote,
          as: 'votes',
        },
        {
          model: Favorite,
          as: 'favorites',
        },
      ],
    })
      .then((post) => {
        callback(null, post);
      })
      .catch((error) => {
        callback(error);
      });
  },

  deletePost: (request, callback) => {
    return Post.findById(request.params.id)
      .then((post) => {
        const authorized = new Authorizer(request.user, post).destroy();
        if (authorized) {
          post.destroy().then(() => {
            callback(null, post);
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

  updatePost(request, updatedPost, callback) {
    return Post.findById(request.params.id).then((post) => {
      if (!post) {
        return callback('Post not found');
      }
      const authorized = new Authorizer(request.user, post).update();

      if (authorized) {
        post
          .update(updatedPost, {
            fields: Object.keys(updatedPost),
          })
          .then(() => {
            callback(null, post);
          })
          .catch((error) => {
            callback(error);
          });
      } else {
        request.flash('notice', 'You are not authorized to do that.');
        callback('Forbidden');
      }
    });
  },
};
