const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:5000/ads';
const sequelize = require('../../src/db/models/index').sequelize;
const Ads = require('../../src/db/models').Ads;

describe('routes : advertisement', () => {
  beforeEach((done) => {
    this.ad;
    sequelize.sync({ force: true }).then((res) => {
      Ads.create({
        title: 'Nike',
        description: 'Buy Me!',
      })
        .then((topic) => {
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
});
