const sequelize = require('../../db/models/index').sequelize;
const Topic = require('../../db/models').Topic;
const Post = require('../../db/models').Post;
const Comment = require('../../db/models').Comment;
const User = require('../../db/models').User;
const Vote = require('../../db/models').Vote;

describe('Vote', () => {
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

            Comment.create({
              body: 'ay caramba!!!!!',
              userId: this.user.id,
              postId: this.post.id,
            })
              .then((response) => {
                this.comment = response;
                done();
              })
              .catch((error) => {
                console.log(error);
                done();
              });
          })
          .catch((error) => {
            console.log(error);
            done();
          });
      });
    });
  });

  describe('#create()', () => {
    it('should create an upvote on a post for a user', (done) => {
      Vote.create({
        value: 1,
        postId: this.post.id,
        userId: this.user.id,
      })
        .then((vote) => {
          expect(vote.value).toBe(1);
          expect(vote.postId).toBe(this.post.id);
          expect(vote.userId).toBe(this.user.id);
          done();
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });

    it('should create a downvote on a post for a user', (done) => {
      Vote.create({
        value: -1,
        postId: this.post.id,
        userId: this.user.id,
      })
        .then((vote) => {
          expect(vote.value).toBe(-1);
          expect(vote.postId).toBe(this.post.id);
          expect(vote.userId).toBe(this.user.id);
          done();
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });

    it('should not create a vote without assigned post or user', (done) => {
      Vote.create({
        value: 1,
      })
        .then((vote) => {
          // the code in this block will not be evaluated since the validation erroror
          // will skip it. Instead, we'll catch the erroror in the catch block below
          // and set the expectations there
          done();
        })
        .catch((error) => {
          expect(error.message).toContain('Vote.userId cannot be null');
          expect(error.message).toContain('Vote.postId cannot be null');
          done();
        });
    });
  });

  describe('#setUser()', () => {
    it('should associate a vote and a user together', (done) => {
      Vote.create({
        value: -1,
        postId: this.post.id,
        userId: this.user.id,
      }).then((vote) => {
        this.vote = vote;
        expect(vote.userId).toBe(this.user.id);
        User.create({
          email: 'bob@example.com',
          password: 'password',
        })
          .then((newUser) => {
            this.vote.setUser(newUser).then((vote) => {
              expect(vote.userId).toBe(newUser.id);
              done();
            });
          })
          .catch((error) => {
            console.log(error);
            done();
          });
      });
    });
  });

  describe('#getUser()', () => {
    it('should return the associated user', (done) => {
      Vote.create({
        value: 1,
        userId: this.user.id,
        postId: this.post.id,
      })
        .then((vote) => {
          vote.getUser().then((user) => {
            expect(user.id).toBe(this.user.id);
            done();
          });
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
  });

  describe('#setPost()', () => {
    it('should associate a post and a vote together', (done) => {
      Vote.create({
        value: -1,
        postId: this.post.id,
        userId: this.user.id,
      }).then((vote) => {
        this.vote = vote;
        Post.create({
          title: 'Dresponses code on Proxima b',
          body: 'Spacesuit, space helmet, space boots, and space gloves',
          topicId: this.topic.id,
          userId: this.user.id,
        })
          .then((newPost) => {
            expect(this.vote.postId).toBe(this.post.id);
            this.vote.setPost(newPost).then((vote) => {
              expect(vote.postId).toBe(newPost.id);
              done();
            });
          })
          .catch((error) => {
            console.log(error);
            done();
          });
      });
    });
  });

  describe('#getPost()', () => {
    it('should return the associated post', (done) => {
      Vote.create({
        value: 1,
        userId: this.user.id,
        postId: this.post.id,
      })
        .then((vote) => {
          this.comment.getPost().then((associatedPost) => {
            expect(associatedPost.title).toBe(
              'My first visit to Proxima Centauri b',
            );
            done();
          });
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
  });
});
