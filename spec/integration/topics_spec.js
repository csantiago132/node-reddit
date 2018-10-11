const request = require('request');
const base = 'http://localhost:5000/topics';

describe('routes : topics', () => {
  beforeAll(() => {
    // start server for each test,
    // this makes test run the server indepent from the app.
    var server = require('../../src/server');
    var Topic = require('../../src/db/models').Topics;
  });

  beforeEach((done) => {
    var sequelize = require('../../src/db/models/index').sequelize;
    this.topic;
    sequelize.sync({ force: true }).then((response) => {
      Topic.create({
        title: 'JS Frameworks',
        description: 'There is a lot of them',
      })
        .then((topic) => {
          this.topic = topic;
          done();
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
  });

  describe('GET /topics', () => {
    it('should return a status code 200', (done) => {
      request.get(base, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(error).toBeNull();
        expect(body).toContain('Topics');
        expect(body).toContain('JS Frameworks');
        done();
      });
    });
  });
});
