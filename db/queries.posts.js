const Post = require('./models').Post;
//const Topic = require('./models').Topic;

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

  getPost(id, callback) {
    return Post.findById(id)
      .then((post) => {
        callback(null, post);
      })
      .catch((error) => {
        callback(error);
      });
  },

  deletePost: (id, callback) => {
    return Post.destroy({
      where: { id },
    })
      .then((deletedRecordsCount) => {
        callback(null, deletedRecordsCount);
      })
      .catch((error) => {
        callback(error);
      });
  },
  // TODO: double-check where this method is being used
  // pops-up on ESLint as a duplicate
  getPosts: (id, callback) => {
    return Post.findById(id)
      .then((post) => {
        callback(null, post);
      })
      .catch((error) => {
        callback(error);
      });
  },
};
