module.exports = {
  index(request, response) {
    response.render('static/index', { title: 'Welcome to Node-Reddit' });
  },

  about(request, response) {
    response.render('static/about', { title: 'About Us' });
  },

  topics(request, response) {
    response.render('topics/index', { title: 'Topics' });
  },
};
