const topicQueries = require('../db/queries.topics.js');

module.exports = {
  index(request, response) {
    topicQueries.getAllTopics((error, topics) => {
      if (error) {
        response.redirect(500, 'static/index');
      } else {
        response.render('topics/index', { topics });
      }
    });
  },

  new(request, response) {
    response.render('topics/new');
  },
};
