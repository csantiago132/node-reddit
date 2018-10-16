const Topic = require('./models').Topic;

module.exports = {
  getAllTopics(callback) {
    return Topic.all()
      .then((topics) => {
        callback(null, topics);
      })
      .catch((error) => {
        callback(error);
      });
  },

  addTopic(newTopic, callback) {
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description,
    })
      .then((topic) => {
        callback(null, topic);
      })
      .catch((error) => {
        callback(error);
      });
  },

  getTopic(id, callback) {
    return Topic.findById(id)
      .then((topic) => {
        callback(null, topic);
      })
      .catch((error) => {
        callback(error);
      });
  },

  deleteTopic(id, callback) {
    return Topic.destroy({
      where: { id },
    })
      .then((topic) => {
        callback(null, topic);
      })
      .catch((error) => {
        callback(error);
      });
  },
};
