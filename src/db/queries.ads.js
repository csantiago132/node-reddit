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

  updateAd(id, updatedAd, callback) {
    return Ads.findById(id).then((ad) => {
      if (!ad) {
        return callback('Advertisement not found');
      }
      ad.update(updatedAd, {
        fields: Object.keys(updatedAd),
      })
        .then(() => {
          callback(null, ad);
        })
        .catch((error) => {
          callback(error);
        });
    });
  },
};
