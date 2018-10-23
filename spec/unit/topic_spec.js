const sequelize = require('../../db/models/index').sequelize;
const Topic = require('../../db/models').Topic;
const Post = require('../../db/models').Post;
const User = require('../../db/models').User;

describe('Topic', () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;
    sequelize.sync({ force: true }).then((response) => {
      User.create({
        email: 'starman@tesla.com',
        password: 'Trekkie4lyfe',
      }).then((user) => {
        this.user = user; //store the user
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
        ).then((topic) => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        });
      });
    });
  });
  describe('#create()', () => {
    it('should create a topic object with a title and description', (done) => {
      Topic.create({
        title: 'JS Frameworks',
        description: 'There are a lot of them',
      })
        .then((topic) => {
          expect(topic.title).toBe('JS Frameworks');
          expect(topic.description).toBe('There are a lot of them');
          done();
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    it('should not create a topic with missing title or description', (done) => {
      Topic.create({
        title: 'Angular is Better than React',
      })
        .then((topic) => {
          //this code block will not be evaluated
          done();
        })
        .catch((error) => {
          expect(error.message).toContain('Topic.description cannot be null');
          done();
        });
    });
  });
  describe('#getPosts()', () => {
    it('should return the associated posts', (done) => {
      this.topic.getPosts().then((posts) => {
        expect(posts[0].title).toBe('My first visit to Proxima Centauri b');
        done();
      });
    });
  });
});
