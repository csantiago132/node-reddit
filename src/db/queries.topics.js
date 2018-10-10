const Topics = require('./models').Topics;

module.exports = {
  getAllTopics(callback) {
    return Topics.all()
      .then((topics) => {
        callback(null, topics);
      })
      .catch((error) => {
        callback(error);
      });
  },
};
