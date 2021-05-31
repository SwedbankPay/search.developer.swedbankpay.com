const nock = require('nock')
const request = require("supertest");
const app = require('../../app')
const searchFunction = require('../../routes/search').searchRouter

const testData = {
  hits: {
    total: 2,
    hits: [{
      _source: {
        title: "I am hit number one",
        url: "https://example.com/hits/1",
      },
      highlight: {
        text: ["Highlighted text for hit number one"]
      }
    },
    {
      _source: {
        title: "I am hit number two",
        url: "https://example.com/hits/2",
      },
      highlight: {
        text: ["Highlighted text for hit number two"]
      }
    }]
  }
};

describe("Test the search function", () => {
  test("Get returns a 200 OK result", () => {
    nock('http://192.168.1.175:9200')
      .post('/test-psp-developer-*/_search')
      .reply(200, testData);

    return request(app)
      .get("/search")
      .set('Authorization', "super-secret-key")
      .then(response => {
        // console.log(response)
        expect(response.statusCode).toBe(200);
      });
  });

  test("Get returns a neat result", () => {
    nock('http://192.168.1.175:9200')
      .post('/test-psp-developer-*/_search')
      .reply(200, testData);

    return request(app)
      .get("/search")
      .set('Authorization', "super-secret-key")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain("I am hit number one");
        expect(response.text).toContain("Highlighted text for hit number one");
        expect(response.text).toContain("I am hit number two");
        expect(response.text).toContain("Highlighted text for hit number two");
      });
  });
});
