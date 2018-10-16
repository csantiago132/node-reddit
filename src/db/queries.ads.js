const Ads = require('./models').Ads;

module.exports = {
  getAllAds(callback) {
    return Ads.all()
      .then((ad) => {
        callback(null, ad);
      })
      .catch((error) => {
        callback(error);
      });
  },
};
