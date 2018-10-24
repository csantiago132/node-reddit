const Vote = require('./models').Vote;

module.exports = {
  createVote: (request, val, callback) => {
    return Vote.findOne({
      where: {
        postId: request.params.postId,
        userId: request.user.id,
      },
    }).then((vote) => {
      if (vote) {
        vote.value = val;
        vote
          .save()
          .then((vote) => {
            callback(null, vote);
          })
          .catch((error) => {
            callback(error);
          });
      } else {
        Vote.create({
          value: val,
          postId: request.params.postId,
          userId: request.user.id,
        })
          .then((vote) => {
            callback(null, vote);
          })
          .catch((error) => {
            callback(error);
          });
      }
    });
  },
};
