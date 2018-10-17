const adsQueries = require('../db/queries.ads.js');

module.exports = {
  index(request, response) {
    adsQueries.getAllAds((error, ads) => {
      if (error) {
        response.redirect(500, 'static/index');
      } else {
        response.render('ads/index', { ads });
      }
    });
  },

  new(request, response) {
    response.render('ads/new');
  },

  create(request, response) {
    let newAd = {
      title: request.body.title,
      description: request.body.description,
    };
    adsQueries.addAd(newAd, (error, ad) => {
      if (error) {
        response.redirect(500, '/ads/new');
      } else {
        response.redirect(303, `/ads/${ad.id}`);
      }
    });
  },

  show(request, response) {
    adsQueries.getAd(request.params.id, (error, ad) => {
      if (error || ad == null) {
        response.redirect(404, '/');
      } else {
        response.render('ads/show', { ad });
      }
    });
  },

  destroy(request, response) {
    adsQueries.deleteAd(request.params.id, (error, ad) => {
      if (error) {
        response.redirect(500, `/ads/${ad.id}`);
      } else {
        response.redirect(303, '/ads');
      }
    });
  },

  edit(request, response) {
    adsQueries.getAd(request.params.id, (error, ad) => {
      if (error || ad == null) {
        response.redirect(404, '/');
      } else {
        response.render('ads/edit', { ad });
      }
    });
  },

  update(request, response) {
    adsQueries.updateAd(request.params.id, request.body, (error, ad) => {
      if (error || ad == null) {
        response.redirect(404, `/ads/${request.params.id}/edit`);
      } else {
        response.redirect(`/ads/${ad.id}`);
      }
    });
  },
};
