const voteQueries = require('../../db/queries.votes.js');

module.exports = {
  upvote(request, response) {
    if (request.user) {
      voteQueries.createVote(request, 1, (error) => {
        if (error) {
          request.flash('erroror', error);
        }
        response.redirect(request.headers.referer);
      });
    } else {
      request.flash('notice', 'You must be signed in to do that.');
      response.redirect(request.headers.referer);
    }
  },

  downvote(request, response) {
    if (request.user) {
      voteQueries.createVote(request, -1, (error) => {
        if (error) {
          request.flash('erroror', error);
        }
        response.redirect(request.headers.referer);
      });
    } else {
      request.flash('notice', 'You must be signed in to do that.');
      response.redirect(request.headers.referer);
    }
  },
};
