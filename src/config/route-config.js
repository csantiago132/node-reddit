module.exports = {
  init: (app) => {
    const staticRoutes = require('../routes/static');
    const topicRoutes = require('../routes/topics');
    const ruleRoutes = require('../routes/rule');
    const adsRoutes = require('../routes/ads');
    const postRoutes = require('../routes/posts');
    const flairRoutes = require('../routes/flairs');
    const userRoutes = require('../routes/users');

    if (process.env.NODE_ENV === 'test') {
      const mockAuth = require('../../spec/support/mock-auth.js');
      mockAuth.fakeIt(app);
    }

    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(ruleRoutes);
    app.use(adsRoutes);
    app.use(postRoutes);
    app.use(flairRoutes);
    app.use(userRoutes);
  },
};
