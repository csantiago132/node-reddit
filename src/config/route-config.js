module.exports = {
  init(application) {
    const staticRoutes = require('../routes/static');
    const topicRoutes = require('../routes/topics');
    application.use(staticRoutes);
    application.use(topicRoutes);
  },
};
