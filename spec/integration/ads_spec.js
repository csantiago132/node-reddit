const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../db/models/index').sequelize;
const Ads = require('../../db/models').Ads;

const base = 'http://localhost:5000/ads';

describe('routes : advertisement', () => {
  beforeEach((done) => {
    this.ad;
    sequelize.sync({ force: true }).then((res) => {
      Ads.create({
        title: 'Nike',
        description: 'Buy Me!',
      })
        .then((ad) => {
          this.ad = ad;
          done();
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
  });

  describe('GET /ads', () => {
    it('should return a status code 200', (done) => {
      request.get(base, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(error).toBeNull();
        expect(body).toContain('Ads');
        expect(body).toContain('Buy Me!');
        done();
      });
    });
  });

  describe('GET /ads/new', () => {
    it('should render a new ad form', (done) => {
      request.get(`${base}/new`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain('New Ad');
        done();
      });
    });
  });

  describe('POST /topics/create', () => {
    const options = {
      url: `${base}/create`,
      form: {
        title: 'Nike',
        description: 'Buy Me!',
      },
    };

    it('should create a new ad and redirect', (done) => {
      request.post(options, (error, response, body) => {
        Ads.findOne({ where: { title: 'Nike' } })
          .then((ad) => {
            expect(response.statusCode).toBe(303);
            expect(ad.title).toBe('Nike');
            expect(ad.description).toBe('Buy Me!');
            done();
          })
          .catch((error) => {
            console.log(error);
            done();
          });
      });
    });
  });

  describe('GET /ads/:id', () => {
    it('should render a view with the selected ad', (done) => {
      request.get(`${base}/${this.ad.id}`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain('Buy Me!');
        done();
      });
    });
  });

  describe('POST /ads/:id/destroy', () => {
    it('should delete the ad with the associated ID', (done) => {
      Ads.all().then((ad) => {
        const adCountBeforeDelete = ad.length;
        expect(adCountBeforeDelete).toBe(1);
        request.post(
          `${base}/${this.ad.id}/destroy`,
          (error, response, body) => {
            Ads.all().then((ad) => {
              expect(error).toBeNull();
              expect(ad.length).toBe(adCountBeforeDelete - 1);
              done();
            });
          },
        );
      });
    });
  });

  describe('GET /ads/:id/edit', () => {
    it('should render a view with an edit ad form', (done) => {
      request.get(`${base}/${this.ad.id}/edit`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain('Edit Advertisement');
        expect(body).toContain('Nike');
        done();
      });
    });
  });

  describe('POST /ads/:id/update', () => {
    it('should update the ad with the given values', (done) => {
      const options = {
        url: `${base}/${this.ad.id}/update`,
        form: {
          title: 'Nike Ad Goes here',
          description: 'There are plenty of shoes on sale!',
        },
      };

      request.post(options, (error, response, body) => {
        expect(error).toBeNull();
        Ads.findOne({
          where: { id: this.ad.id },
        }).then((ad) => {
          expect(ad.title).toBe('Nike Ad Goes here');
          done();
        });
      });
    });
  });
});
