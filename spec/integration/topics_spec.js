const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;

const base = 'http://localhost:5000/topics';

describe('routes : topics', () => {
  beforeEach((done) => {
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

  describe('GET /topics/new', () => {
    it('should render a new topic form', (done) => {
      request.get(`${base}/new`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain('New Topic');
        done();
      });
    });
  });
});
