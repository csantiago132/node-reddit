const sequelize = require('../../src/models/index').sequelize;
const Topic = require('../../db/models').Topic;
const Post = require('../../db/models').Post;

describe('Topic', () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({ force: true }).then((response) => {
      Topic.create(
        {
          title: 'Expeditions to Alpha Centauri',
          description:
            'A compilation of reports from recent visits to the star system.',
          posts: [
            {
              title: 'My first time at Proxima Centauri',
              body: 'I wrote something about it.',
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
          this.post = topic.posts[0];
          done();
        })
        .catch((error) => {
          console.log(error);
          done();
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
        expect(posts[0].title).toBe('My first time at Proxima Centauri');
        done();
      });
    });
  });
});
