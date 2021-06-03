const nock = require('nock')
const request = require("supertest");
const app = require('../../app')
const $ = require('jquery');
import setImmediate from 'setimmediate';

const testData = {
  hits: {
    total: {
      value: 2
    },
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

describe("Search", () => {
  test("index returns 200 OK", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);

        document.body.innerHTML = response.text;

        expect($(".search-header h1").text()).toEqual("Search the Developer Portal");
        expect($("#search-content .search-results p").text()).toEqual("Type in the query you wish to search for below.")
      });
  });

  test("search returns search result", () => {
    nock('http://192.168.1.175:9200')
      .post('/test-psp-developer-*/_search')
      .reply(200, testData);

    return request(app)
      .get("/?q=abc")
      .then(response => {
        expect(response.statusCode).toBe(200);

        document.body.innerHTML = response.text;

        const searchResults = $("#search-content .search-results .search-result");
        const searchResultTexts = $(".search-result-text", searchResults);
        const searchResultTitles = $(".search-result-title", searchResults);

        expect(searchResults.length).toBe(2);
        expect(searchResultTexts.length).toBe(2);
        expect(searchResultTitles.length).toBe(2);

        expect(searchResultTitles.first().text()).toEqual("I am hit number one")
        expect(searchResultTexts.first().text()).toEqual("Highlighted text for hit number one")
        expect(searchResultTitles.last().text()).toEqual("I am hit number two")
        expect(searchResultTexts.last().text()).toEqual("Highlighted text for hit number two")
      });
  });
});
