const request = require('request');
const base = 'http://localhost:5000';

describe('routes : static', () => {
  beforeAll(() => {
    // start server for each test,
    // this makes test run the server indepent from the app.
    server = require('../../src/server');
  });

  describe('GET /', () => {
    it('should return status code 200', (done) => {
      request.get(base, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it(`should have 'Welcome to Node-Reddit' in the body`, (done) => {
      request.get(base, (error, response, body) => {
        expect(body).toContain('Welcome to Node-Reddit');
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
