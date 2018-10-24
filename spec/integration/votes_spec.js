const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../db/models/index').sequelize;
const Topic = require('../../db/models').Topic;
const Post = require('../../db/models').Post;
const Comment = require('../../db/models').Comment;
const User = require('../../db/models').User;
const Vote = require('../../db/models').Vote;

const base = 'http://localhost:5000/topics/';

describe('routes : votes', () => {
  beforeEach((done) => {
    this.user;
    this.topic;
    this.post;
    this.vote;

    sequelize.sync({ force: true }).then((response) => {
      User.create({
        email: 'starman@tesla.com',
        password: 'Trekkie4lyfe',
      }).then((response) => {
        this.user = response;
        Topic.create(
          {
            title: 'Expeditions to Alpha Centauri',
            description:
              'A compilation of reports from recent visits to the star system.',
            posts: [
              {
                title: 'My first visit to Proxima Centauri b',
                body: 'I saw some rocks.',
                userId: this.user.id,
              },
            ],
          },
          {
            include: {
              model: Post,
              as: 'posts',
            },
          },
        )
          .then((response) => {
            this.topic = response;
            this.post = this.topic.posts[0];
            done();
          })
          .catch((error) => {
            console.log(error);
            done();
          });
      });
    });
  });

  describe('guest attempting to vote on a post', () => {
    beforeEach((done) => {
      request.get(
        {
          url: 'http://localhost:5000/auth/fake',
          form: {
            userId: 0,
          },
        },
        (error, response, body) => {
          done();
        },
      );
    });

    describe('GET /topics/:topicId/posts/:postId/votes/upvote', () => {
      it('should not create a new vote', (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/votes/upvote`,
        };
        request.get(options, (error, response, body) => {
          Vote.findOne({
            where: {
              userId: this.user.id,
              postId: this.post.id,
            },
          })
            .then((vote) => {
              expect(vote).toBeNull();
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

  describe('signed in user voting on a post', () => {
    beforeEach((done) => {
      request.get(
        {
          url: 'http://localhost:5000/auth/fake',
          form: {
            role: 'member', // mock authenticate as member user
            userId: this.user.id,
          },
        },
        (error, response, body) => {
          done();
        },
      );
    });

    describe('GET /topics/:topicId/posts/:postId/votes/upvote', () => {
      it('should create an upvote', (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/votes/upvote`,
        };
        request.get(options, (error, response, body) => {
          Vote.findOne({
            where: {
              userId: this.user.id,
              postId: this.post.id,
            },
          })
            .then((vote) => {
              // confirm that an upvote was created
              expect(vote).not.toBeNull();
              expect(vote.value).toBe(1);
              expect(vote.userId).toBe(this.user.id);
              expect(vote.postId).toBe(this.post.id);
              done();
            })
            .catch((error) => {
              console.log(error);
              done();
            });
        });
      });
    });

    describe('GET /topics/:topicId/posts/:postId/votes/downvote', () => {
      it('should create a downvote', (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/votes/downvote`,
        };
        request.get(options, (error, response, body) => {
          Vote.findOne({
            where: {
              userId: this.user.id,
              postId: this.post.id,
            },
          })
            .then((vote) => {
              // confirm that a downvote was created
              expect(vote).not.toBeNull();
              expect(vote.value).toBe(-1);
              expect(vote.userId).toBe(this.user.id);
              expect(vote.postId).toBe(this.post.id);
              done();
            })
            .catch((error) => {
              console.log(error);
              done();
            });
        });
      });
    });
  }); //end context for signed in user
});
