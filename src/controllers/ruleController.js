const ruleQueries = require('../../db/queries.rule.js');

module.exports = {
  index: (request, response) => {
    ruleQueries.getAllRules((error, rules) => {
      if (error) {
        response.redirect(500, 'static/index');
      } else {
        response.render('rule/index', { rules });
      }
    });
  },
};
