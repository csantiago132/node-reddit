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
};
