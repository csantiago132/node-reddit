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

  addAd(newAd, callback) {
    return Ads.create({
      title: newAd.title,
      description: newAd.description,
    })
      .then((ad) => {
        callback(null, ad);
      })
      .catch((error) => {
        callback(error);
      });
  },

  getAd(id, callback) {
    return Ads.findById(id)
      .then((ad) => {
        callback(null, ad);
      })
      .catch((error) => {
        callback(error);
      });
  },

  deleteAd(id, callback) {
    return Ads.destroy({
      where: { id },
    })
      .then((ad) => {
        callback(null, ad);
      })
      .catch((error) => {
        callback(error);
      });
  },
};
