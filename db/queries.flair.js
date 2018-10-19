const Flair = require('./models').Flair;

module.exports = {
  getAllFlairs: (callback) => {
    return Flair.all()
      .then((flair) => {
        callback(null, flair);
      })
      .catch((error) => {
        callback(error);
      });
  },

  addFlair: (newFlair, callback) => {
    return Flair.create({
      name: newFlair.name,
      color: newFlair.color,
    })
      .then((flair) => {
        callback(null, flair);
      })
      .catch((error) => {
        callback(error);
      });
  },

  getFlair: (id, callback) => {
    return Flair.findById(id)
      .then((flair) => {
        callback(null, flair);
      })
      .catch((error) => {
        callback(error);
      });
  },

  deleteFlair(id, callback) {
    return Flair.destroy({
      where: { id },
    })
      .then((flair) => {
        callback(null, flair);
      })
      .catch((error) => {
        callback(error);
      });
  },

  updateFlair: (id, updatedFlair, callback) => {
    return Flair.findById(id).then((flair) => {
      if (!flair) {
        return callback('Flair not found');
      }
      flair
        .update(updatedFlair, {
          fields: Object.keys(updatedFlair),
        })
        .then(() => {
          callback(null, flair);
        })
        .catch((err) => {
          callback(err);
        });
    });
  },
};
