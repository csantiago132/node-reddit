const Rule = require('./models').Rule;

module.exports = {
  getAllRules(callback) {
    return Rule.all()
      .then((rules) => {
        callback(null, rules);
      })
      .catch((error) => {
        callback(error);
      });
  },
};
