const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../db/models/index').sequelize;
const Topic = require('../../db/models').Topic;
const Post = require('../../db/models').Post;

const base = 'http://localhost:5000/topics';

describe('routes : posts', () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({ force: true }).then((response) => {
      Topic.create({
        title: 'Winter Games',
        description: 'Post your Winter Games stories.',
      }).then((topic) => {
        this.topic = topic;
        Post.create({
          title: 'Snowball Fighting',
          body: 'So much snow!',
          topicId: this.topic.id,
        })
          .then((post) => {
            this.post = post;
            done();
          })
          .catch((error) => {
            console.log(error);
            done();
          });
      });
    });
  });

  describe('GET /topics/:topicId/posts/new', () => {
    it('should render a new post form', (done) => {
      request.get(
        `${base}/${this.topic.id}/posts/new`,
        (error, response, body) => {
          expect(error).toBeNull();
          expect(body).toContain('New Post');
          done();
        },
      );
    });
  });

  describe('POST /topics/:topicId/posts/create', () => {
    it('should create a new post and redirect', (done) => {
      const options = {
        url: `${base}/${this.topic.id}/posts/create`,
        form: {
          title: 'Watching snow melt',
          body:
            'Without a doubt my favoriting things to do besides watching paint dry!',
        },
      };
      request.post(options, (error, response, body) => {
        Post.findOne({ where: { title: 'Watching snow melt' } })
          .then((post) => {
            expect(post).not.toBeNull();
            expect(post.title).toBe('Watching snow melt');
            expect(post.body).toBe(
              'Without a doubt my favoriting things to do besides watching paint dry!',
            );
            expect(post.topicId).not.toBeNull();
            done();
          })
          .catch((error) => {
            console.log(error);
            done();
          });
      });
    });
  });

  describe('GET /topics/:topicId/posts/:id', () => {
    it('should render a view with the selected post', (done) => {
      request.get(
        `${base}/${this.topic.id}/posts/${this.post.id}`,
        (error, response, body) => {
          expect(error).toBeNull();
          expect(body).toContain('Snowball Fighting');
          done();
        },
      );
    });
  });
});
