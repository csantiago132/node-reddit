const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/advertisement';

describe('routes : advertisement', () => {
  describe('GET /advertisement', () => {
    it('should return a status code 200', (done) => {
      request.get(base, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
