const nock = require('nock')
const request = require("supertest");
const app = require('../../app')
const searchFunction = require('../../routes/search').searchFunction

function getTestData() {
  return {
    hits: {
      total: 2,
      hits: [{
        _source: {
          title: "title",
          url: "url",
        },
        highlight: "highlight"
      },
      {
        _source: {
          title: "title",
          url: "url",
        },
        highlight: "highlight"
      }]
    }
  };
}

describe("Test the search function", () => {
  test("Get returns a 200 OK result", () => {
    const scope = nock('http://192.168.1.175:9200')
    .post('/test-psp-developer/_search')
    .reply(200, getTestData());

    return request(app)
    .get("/search")
    .set('Authorization', "super-secret-key")
    .then(response => {
      console.log(response)
      expect(response.statusCode).toBe(200);
    });
  });

  test("Get returns a neat result", () => {
    const scope = nock('http://192.168.1.175:9200')
    .post('/test-psp-developer/_search')
    .reply(200, getTestData());

    return request(app)
    .get("/search")
    .set('Authorization', "super-secret-key")
    .then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('{"hits":[{"title":"title","url":"url","highlight":"highlight"},{"title":"title","url":"url","highlight":"highlight"}]}')
    });
  });
});
