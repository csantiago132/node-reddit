const request = require('request');
const base = 'http://localhost:5000/topics';
const Topics = require('../../src/db/models/topic').Topic;

describe('routes : topics', () => {
  beforeAll(() => {
    // start server for each test,
    // this makes test run the server indepent from the app.
    server = require('../../src/server');
  });

  beforeEach((done) => {
    const sequelize = require('../../src/db/models/index').sequelize;
    this.topic;
    sequelize.sync({ force: true }).then((res) => {
      Topics.create({
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
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(error).toBeNull();
        expect(body).toContain('Topics');
        expect(body).toContain('JS Frameworks');
        done();
      });
    });
  });
});
