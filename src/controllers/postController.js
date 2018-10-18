const postQueries = require('../../db/queries.posts.js');

module.exports = {
  new: (request, response) => {
    response.render('posts/new', { topicId: request.params.topicId });
  },

  create: (request, response) => {
    let newPost = {
      title: request.body.title,
      body: request.body.body,
      topicId: request.params.topicId,
    };
    postQueries.addPost(newPost, (error, post) => {
      if (error) {
        response.redirect(500, '/posts/new');
      } else {
        response.redirect(303, `/topics/${newPost.topicId}/posts/${post.id}`);
      }
    });
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
    // TODO: see if this param is needed later (deletedRecordsCount)
    // Prev: ...deletePost(request.params.id, (error, deletedRecordsCount)
    postQueries.deletePost(request.params.id, (error) => {
      if (error) {
        response.redirect(
          500,
          `/topics/${request.params.topicId}/posts/${request.params.id}`,
        );
      } else {
        response.redirect(303, `/topics/${request.params.topicId}`);
      }
    });
  },
};
