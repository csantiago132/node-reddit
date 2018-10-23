const postQueries = require('../../db/queries.posts.js');
const Authorizer = require('../policies/post');

module.exports = {
  new: (request, response) => {
    const authorized = new Authorizer(request.user).new();
    if (authorized) {
      response.render('posts/new', {
        topicId: request.params.topicId,
        title: 'New Post',
      });
    } else {
      request.flash('notice', 'You are not authorized to do that.');
      response.redirect(`/posts`);
    }
  },

  create: (request, response) => {
    const authorized = new Authorizer(request.user).create();
    if (authorized) {
      let newPost = {
        title: request.body.title,
        body: request.body.body,
        topicId: request.params.topicId,
        userId: request.user.id,
      };
      postQueries.addPost(newPost, (error, post) => {
        if (error) {
          response.redirect(500, '/posts/new');
        } else {
          response.redirect(303, `/topics/${newPost.topicId}/posts/${post.id}`);
        }
      });
    } else {
      request.flash('notice', 'You are not authorized to do that.');
      response.redirect(`/topics/${request.params.topicId}`);
    }
  },

  show: (request, response) => {
    postQueries.getPost(request.params.id, (error, post) => {
      if (error || post == null) {
        response.redirect(404, '/');
      } else {
        response.render('posts/show', { post });
      }
    });
  },

  destroy: (request, response) => {
    postQueries.deletePost(request, (error, post) => {
      if (error) {
        response.redirect(
          error,
          `/topics/${request.params.topicId}/posts/${request.params.id}`,
        );
      } else {
        const authorized = new Authorizer(request.user, post).destroy();
        if (authorized) {
          response.redirect(303, `/topics/${request.params.topicId}`);
        } else {
          request.flash('notice', 'You are not authorized to do that.');
          response.redirect(`/topics/${request.params.topicId}`);
        }
      }
    });
  },

  edit: (request, response) => {
    postQueries.getPost(request.params.id, (error, post) => {
      if (error || post == null) {
        response.redirect(404, '/');
      } else {
        const authorized = new Authorizer(request.user, post).edit();
        if (authorized) {
          response.render('posts/edit', { post });
        } else {
          request.flash('notice', 'You are not authorized to do that.');
          response.redirect(
            `/topics/${request.params.topicId}/posts/${request.params.id}`,
          );
        }
      }
    });
  },

  update: (request, response) => {
    postQueries.updatePost(request, request.body, (error, post) => {
      if (error || post == null) {
        response.redirect(
          404,
          `/topics/${request.params.topicId}/posts/${request.params.id}/edit`,
        );
      } else {
        response.redirect(
          `/topics/${request.params.topicId}/posts/${request.params.id}`,
        );
      }
    });
  },
};
