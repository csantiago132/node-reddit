module.exports = {
  init(application) {
    const staticRoutes = require('../routes/static');
    const topicRoutes = require('../routes/topics');
    const ruleRoutes = require('../routes/rule');
    const adsRoutes = require('../routes/ads');

    application.use(staticRoutes);
    application.use(topicRoutes);
    application.use(ruleRoutes);
    application.use(adsRoutes);
  },
};
