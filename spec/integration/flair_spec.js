const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../db/models/index').sequelize;
const Flair = require('../../db/models').Flair;

const base = 'http://localhost:5000/flairs';

describe('routes : flairs', () => {
  beforeEach((done) => {
    this.flair;
    sequelize.sync({ force: true }).then((response) => {
      Flair.create({
        name: 'ReactJS',
        color: 'Red',
      })
        .then((flair) => {
          this.flair = flair;
          done();
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
  });

  describe('GET /flairs', () => {
    it('should return a status code 200 and all flairs', (done) => {
      request.get(base, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(error).toBeNull();
        expect(body).toContain('Flairs');
        expect(body).toContain('ReactJS');
        done();
      });
    });
  });

  describe('GET /flairs/new', () => {
    it('should render a flair form', (done) => {
      request.get(`${base}/new`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain('New Flair');
        done();
      });
    });
  });

  describe('POST /flairs/create', () => {
    const options = {
      url: `${base}/create`,
      form: {
        name: 'Sequelize',
        color: 'Black',
      },
    };

    it('should return a new flair', (done) => {
      request.post(options, (error, response, body) => {
        Flair.findOne({ where: { name: 'Sequelize' } })
          .then((flair) => {
            expect(response.statusCode).toBe(303);
            expect(flair.name).toBe('Sequelize');
            expect(flair.color).toBe('Black');
            done();
          })
          .catch((error) => {
            console.log(error);
            done();
          });
      });
    });
  });

  describe('GET /flairs/:id', () => {
    it('should return a view with the selected flair', (done) => {
      request.get(`${base}/${this.flair.id}`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain('ReactJS');
        done();
      });
    });
  });

  describe('POST /flairs/:id/destroy', () => {
    it('should delete a flair with an associated ID', (done) => {
      Flair.all().then((flair) => {
        const flairCountBeforeDelete = flair.length;
        expect(flairCountBeforeDelete).toBe(1);

        request.post(
          `${base}/${this.flair.id}/destroy`,
          (error, response, body) => {
            Flair.all().then((flairs) => {
              expect(error).toBeNull();
              expect(flairs.length).toBe(flairCountBeforeDelete - 1);
              done();
            });
          },
        );
      });
    });
  });

  describe('GET /flairs/:id/edit', () => {
    it('should return a form to edit a flair', (done) => {
      request.get(`${base}/${this.flair.id}/edit`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain('Edit Flair');
        expect(body).toContain('ReactJS');
        done();
      });
    });
  });

  describe('GET /flairs/:id/update', () => {
    it('should update the flair with the given values', (done) => {
      const options = {
        url: `${base}/${this.flair.id}/update`,
        form: {
          name: 'Frameworks',
          color: 'Red',
        },
      };
      request.post(options, (error, response, body) => {
        expect(error).toBeNull();

        Flair.findOne({
          where: { id: this.flair.id },
        }).then((flair) => {
          expect(flair.name).toBe('Frameworks');
          done();
        });
      });
    });
  });
});
