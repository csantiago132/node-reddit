const commentQueries = require('../../db/queries.comments.js');
const Authorizer = require('../policies/comment.js');

module.exports = {
  create: (request, response) => {
    /* check the policy to confirm the user can create comments */
    const authorized = new Authorizer(request.user).create();
    if (authorized) {
      /* builds a newComment object with the information from the request */
      let newComment = {
        body: request.body.body,
        userId: request.user.id,
        postId: request.params.postId,
      };

      commentQueries.createComment(newComment, (error) => {
        /* redirect the user to the same place regardless of the outcome, so we populate an error if there is one and return to the referer view */
        if (error) {
          request.flash('erroror', error);
        }
        response.redirect(request.headers.referer);
      });
    } else {
      request.flash('notice', 'You must be signed in to do that.');
      request.redirect('/users/sign_in');
    }
  },

  /* passes the request to the deleteComment method to determine if we should be deleted. */
  destroy: (request, response) => {
    commentQueries.deleteComment(request, (error) => {
      if (error) {
        response.redirect(error, request.headers.referer);
      } else {
        response.redirect(request.headers.referer);
      }
    });
  },
};
