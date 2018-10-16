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

  create(request, response) {
    let newTopic = {
      title: request.body.title,
      description: request.body.description,
    };

    topicQueries.addTopic(newTopic, (error, topic) => {
      if (error) {
        response.redirect(500, '/topics/new');
      } else {
        response.redirect(303, `/topics/${topic.id}`);
      }
    });
  },

  show(request, response) {
    topicQueries.getTopic(request.params.id, (error, topic) => {
      if (error || topic == null) {
        response.redirect(404, '/');
      } else {
        response.render('topics/show', { topic });
      }
    });
  },

  destroy(request, response) {
    topicQueries.deleteTopic(request.params.id, (error, topic) => {
      if (error) {
        response.redirect(500, `/topics/${topic.id}`);
      } else {
        response.redirect(303, '/topics');
      }
    });
  },

  edit(request, response) {
    topicQueries.getTopic(request.params.id, (error, topic) => {
      if (error || topic == null) {
        response.redirect(404, '/');
      } else {
        response.render('topics/edit', { topic });
      }
    });
  },
};
