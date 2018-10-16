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

  describe('POST /topics/create', () => {
    const options = {
      url: `${base}/create`,
      form: {
        title: 'blink-182 songs',
        description: "What's your favorite blink-182 song?",
      },
    };

    it('should create a new topic and redirect', (done) => {
      request.post(options, (error, response, body) => {
        Topic.findOne({ where: { title: 'blink-182 songs' } })
          .then((topic) => {
            expect(response.statusCode).toBe(303);
            expect(topic.title).toBe('blink-182 songs');
            expect(topic.description).toBe(
              "What's your favorite blink-182 song?",
            );
            done();
          })
          .catch((error) => {
            console.log(error);
            done();
          });
      });
    });
  });

  describe('GET /topics/:id', () => {
    it('should render a view with the selected topic', (done) => {
      request.get(`${base}/${this.topic.id}`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain('JS Frameworks');
        done();
      });
    });
  });

  describe('POST /topics/:id/destroy', () => {
    it('should delete the topic with the associated ID', (done) => {
      Topic.all().then((topics) => {
        const topicCountBeforeDelete = topics.length;
        expect(topicCountBeforeDelete).toBe(1);

        request.post(
          `${base}/${this.topic.id}/destroy`,
          (error, response, body) => {
            Topic.all().then((topics) => {
              expect(error).toBeNull();
              expect(topics.length).toBe(topicCountBeforeDelete - 1);
              done();
            });
          },
        );
      });
    });
  });
});
