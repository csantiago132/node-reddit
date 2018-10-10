const request = require("request");
//const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

  describe("GET /", () => {
    it("should return status code 200", (done) => {
      request.get(base, (res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });
});