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
    sequelize.sync({ force: true }).then((res) => {
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
});
