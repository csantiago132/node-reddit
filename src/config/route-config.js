module.exports = {
  init(application) {
    const staticRoutes = require('../routes/static');
    application.use(staticRoutes);
  },
};
