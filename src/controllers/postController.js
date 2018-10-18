//const postQueries = require('../../db/queries.posts.js');

module.exports = {
  new(request, response) {
    response.render('posts/new', { topicId: request.params.topicId });
  },
};
