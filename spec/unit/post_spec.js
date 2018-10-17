const sequelize = require('../../db/models/index').sequelize;
const Topic = require('../../db/models').Topic;

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
  });
});
