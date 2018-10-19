const flairQueries = require('../../db/queries.flair.js');

module.exports = {
  index: (request, response) => {
    flairQueries.getAllFlairs((error, flairs) => {
      if (error) {
        response.redirect(500, 'static/index');
      } else {
        response.render('flairs/index', { flairs });
      }
    });
  },

  new: (request, response) => {
    response.render('flairs/new');
  },

  create: (request, response) => {
    let newFlair = {
      name: request.body.name,
      color: request.body.color,
    };

    flairQueries.addFlair(newFlair, (error, flair) => {
      if (error) {
        response.redirect(500, '/flairs/new');
      } else {
        response.redirect(303, `/flairs/${flair.id}`);
      }
    });
  },

  show: (request, response) => {
    flairQueries.getFlair(request.params.id, (error, flair) => {
      if (error || flair == null) {
        response.redirect(404, '/');
      } else {
        response.render('flairs/show', { flair });
      }
    });
  },

  destroy: (request, response) => {
    flairQueries.deleteFlair(request.params.id, (error, flair) => {
      if (error) {
        response.redirect(500, `/flairs/${flair.id}`);
      } else {
        response.redirect(303, '/flairs');
      }
    });
  },

  edit: (request, response) => {
    flairQueries.getFlair(request.params.id, (error, flair) => {
      if (error || flair == null) {
        response.redirect(404, `/`);
      } else {
        response.render('flairs/edit', { flair });
      }
    });
  },

  update: (request, response) => {
    flairQueries.updateFlair(
      request.params.id,
      request.body,
      (error, flair) => {
        if (error || flair == null) {
          response.redirect(404, `/flairs/${request.params.id}/edit`);
        } else {
          response.redirect(`/flairs/${flair.id}`);
        }
      },
    );
  },
};
