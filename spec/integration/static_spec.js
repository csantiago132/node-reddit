const request = require('request');
//const server = require("../../src/server");
const base = 'http://localhost:5000/';

describe('routes : static', () => {
  describe('GET /', () => {
    it('should return status code 200', (done) => {
      request.get(base, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  describe('GET /marco', () => {
    it('should return polo', (done) => {
      request.get(`${base}/marco`, (error, response, body) => {
        expect(response.body).toBe('polo');
        done();
      });
    });
  });
});
