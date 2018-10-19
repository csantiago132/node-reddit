module.exports = {
  init(application) {
    const staticRoutes = require('../routes/static');
    const topicRoutes = require('../routes/topics');
    const ruleRoutes = require('../routes/rule');
    const adsRoutes = require('../routes/ads');
    const postRoutes = require('../routes/posts');
    const flairRoutes = require('../routes/flairs');
    const userRoutes = require('../routes/users');

    application.use(staticRoutes);
    application.use(topicRoutes);
    application.use(ruleRoutes);
    application.use(adsRoutes);
    application.use(postRoutes);
    application.use(flairRoutes);
    application.use(userRoutes);
  },
};
