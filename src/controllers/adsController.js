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
};
