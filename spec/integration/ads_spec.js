const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../src/db/models/index').sequelize;
const Ads = require('../../src/db/models').Ads;

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
});
