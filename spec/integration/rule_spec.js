const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../src/db/models/index').sequelize;
const Rule = require('../../src/db/models').Rule;

const base = 'http://localhost:5000/rule';

describe('routes : rule', () => {
  beforeEach((done) => {
    this.rule;
    sequelize.sync({ force: true }).then((response) => {
      Rule.create({
        description: 'There is a lot of rules',
      })
        .then((rule) => {
          this.rule = rule;
          done();
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
  });

  describe('GET /rule', () => {
    it('should return a status code 200', (done) => {
      request.get(base, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(error).toBeNull();
        expect(body).toContain('Rule');
        expect(body).toContain('There is a lot of rules');
        done();
      });
    });
  });
});
