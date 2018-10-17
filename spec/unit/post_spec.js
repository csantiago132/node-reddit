const sequelize = require('../../db/models/index').sequelize;
const Topic = require('../../db/models').Topic;
const Post = require('../../db/models').Post;

describe('Post', () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({ force: true }).then((response) => {
      Topic.create({
        title: 'Expeditions to Alpha Centauri',
        description:
          'A compilation of reports from recent visits to the star system.',
      })
        .then((topic) => {
          this.topic = topic;
          Post.create({
            title: 'My first visit to Proxima Centauri b',
            body: 'I saw some rocks.',
            topicId: this.topic.id,
          }).then((post) => {
            this.post = post;
            done();
          });
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
  });

  describe('#create()', () => {
    it('should create a post object with a title, body, and assigned topic', (done) => {
      Post.create({
        title: 'Pros of Cryosleep during the long journey',
        body: "1. Not having to answer the 'are we there yet?' question.",
        topicId: this.topic.id,
      })
        .then((post) => {
          expect(post.title).toBe('Pros of Cryosleep during the long journey');
          expect(post.body).toBe(
            "1. Not having to answer the 'are we there yet?' question.",
          );
          done();
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });

    it('should not create a post with missing title, body, or assigned topic', (done) => {
      Post.create({
        title: 'Pros of Cryosleep during the long journey',
      })
        .then((post) => {
          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there
          done();
        })
        .catch((error) => {
          expect(error.message).toContain('Post.body cannot be null');
          expect(error.message).toContain('Post.topicId cannot be null');
          done();
        });
    });
  });

  describe('#setTopic()', () => {
    it('should associate a topic and a post together', (done) => {
      Topic.create({
        title: 'Challenges of interstellar travel',
        description: '1. The Wi-Fi is terrible',
      }).then((newTopic) => {
        expect(this.post.topicId).toBe(this.topic.id);
        this.post.setTopic(newTopic).then((post) => {
          expect(post.topicId).toBe(newTopic.id);
          done();
        });
      });
    });
  });
});
