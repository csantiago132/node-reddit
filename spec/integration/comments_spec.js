const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../db/models/index').sequelize;
const Topic = require('../../db/models').Topic;
const Post = require('../../db/models').Post;
const User = require('../../db/models').User;
const Comment = require('../../db/models').Comment;

const base = 'http://localhost:5000/topics/';

describe('routes : comments', () => {
  beforeEach((done) => {
    this.user;
    this.topic;
    this.post;
    this.comment;
    sequelize.sync({ force: true }).then((responseponse) => {
      User.create({
        email: 'starman@tesla.com',
        password: 'Trekkie4lyfe',
      }).then((user) => {
        this.user = user;
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
          .then((topic) => {
            this.topic = topic;
            this.post = this.topic.posts[0];

            Comment.create({
              body: 'ay caramba!!!!!',
              userId: this.user.id,
              postId: this.post.id,
            })
              .then((comment) => {
                this.comment = comment;
                done();
              })
              .catch((erroror) => {
                console.log(erroror);
                done();
              });
          })
          .catch((erroror) => {
            console.log(erroror);
            done();
          });
      });
    });
  });

  describe('guest attempting to perform CRUD actions for Comment', () => {
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

    describe('POST /topics/:topicId/posts/:postId/comments/create', () => {
      it('should not create a new comment', (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/comments/create`,
          form: {
            body: 'This comment is amazing!',
          },
        };
        request.post(options, (error, response, body) => {
          Comment.findOne({ where: { body: 'This comment is amazing!' } })
            .then((comment) => {
              expect(comment).toBeNull();
              done();
            })
            .catch((error) => {
              console.log(error);
              done();
            });
        });
      });
    });

    describe('POST /topics/:topicId/posts/:postId/comments/:id/destroy', () => {
      it('should not delete the comment with the associated ID', (done) => {
        Comment.all().then((comments) => {
          const commentCountBeforeDelete = comments.length;
          expect(commentCountBeforeDelete).toBe(1);
          request.post(
            `${base}${this.topic.id}/posts/${this.post.id}/comments/${
              this.comment.id
            }/destroy`,
            (error, response, body) => {
              Comment.all().then((comments) => {
                expect(error).toBeNull();
                expect(comments.length).toBe(commentCountBeforeDelete);
                done();
              });
            },
          );
        });
      });
    });
  });

  describe('signed in user performing CRUD actions for Comment', () => {
    beforeEach((done) => {
      request.get(
        {
          url: 'http://localhost:5000/auth/fake',
          form: {
            role: 'member',
            userId: this.user.id,
          },
        },
        (err, res, body) => {
          done();
        },
      );
    });

    describe('POST /topics/:topicId/posts/:postId/comments/create', () => {
      it('should create a new comment and redirect', (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/comments/create`,
          form: {
            body: 'This comment is amazing!',
          },
        };
        request.post(options, (err, res, body) => {
          Comment.findOne({ where: { body: 'This comment is amazing!' } })
            .then((comment) => {
              expect(comment).not.toBeNull();
              expect(comment.body).toBe('This comment is amazing!');
              expect(comment.id).not.toBeNull();
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
        });
      });
    });

    describe('POST /topics/:topicId/posts/:postId/comments/:id/destroy', () => {
      it('should delete the comment with the associated ID', (done) => {
        Comment.all().then((comments) => {
          const commentCountBeforeDelete = comments.length;
          expect(commentCountBeforeDelete).toBe(1);
          request.post(
            `${base}${this.topic.id}/posts/${this.post.id}/comments/${
              this.comment.id
            }/destroy`,
            (err, res, body) => {
              expect(res.statusCode).toBe(302);
              Comment.all().then((comments) => {
                expect(err).toBeNull();
                expect(comments.length).toBe(commentCountBeforeDelete - 1);
                done();
              });
            },
          );
        });
      });
    });
  }); //end context for signed in user
});
