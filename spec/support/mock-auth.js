module.exports = {
  fakeIt: (app) => {
    let role, id, email;
    const middleware = (request, response, next) => {
      role = request.body.role || role;
      id = request.body.userId || id;
      email = request.body.email || email;
      if (id && id != 0) {
        request.user = {
          id: id,
          email: email,
          role: role,
        };
      } else if (id == 0) {
        delete request.user;
      }
      if (next) {
        next();
      }
    };
    let route = (request, response) => {
      response.redirect('/');
    };
    app.use(middleware);
    app.get('/auth/fake', route);
  },
};
