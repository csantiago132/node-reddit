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
};
