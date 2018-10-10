const request = require('request');
const base = 'http://localhost:5000/topics';

describe('routes : topics', () => {
  beforeAll(() => {
    // start server for each test,
    // this makes test run the server indepent from the app.
    server = require('../../src/server');
  });

  describe('GET /topics', () => {
    it('should return a status code 200', (done) => {
      request.get(base, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
