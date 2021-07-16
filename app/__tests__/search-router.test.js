import nock from 'nock';
import request from 'supertest';
import app from '../../app.js';
import $ from 'jquery';
import { convert } from 'number-words';

function mockElasticsearch(hitme) {
  const hits = Array.from(Array(100).keys()).map(i => {
    const numWord = convert(++i);
    const title = `I am hit number ${numWord}`;
    const url = `/hits/${i}.html`;
    const lead_title = i % 2 == 0 ? `Lead ${i}` : null;
    const highlight = `Highlighted text for hit number ${numWord}`;
    return { _source: { title, url, lead_title }, highlight: { text: [highlight] } };
  });

  const hitsTestData = { hits: { total: { value: hits.length }, hits } };
  const noHitsTestData = { hits: { total: { value: 0 }, hits: [] } };
  const testData = hitme ? hitsTestData : noHitsTestData;

  nock('http://192.168.1.175:9200')
    .post('/test-psp-developer-*/_search')
    .reply(200, testData);
}

describe('Search', () => {
  test('index returns 200 OK', () => {
    return request(app).get('/').then(response => {
      expect(response.statusCode).toBe(200);

      document.body.innerHTML = response.text;

      expect($('.search-header h1').text()).toEqual('Search the Developer Portal');
      expect($('#search-content .search-results p').text()).toEqual('Type in the query you wish to search for below.')
    });
  });

  test('search returns search result', () => {
    mockElasticsearch(true);

    return request(app).get('/?q=abc').then(response => {
      expect(response.statusCode).toBe(200);

      document.body.innerHTML = response.text;

      expect($('.search-header h1').text()).toEqual('Results for "abc"');

      const searchResults = $('#search-content .search-results .search-result');
      const searchResultTexts = $('.search-result-text', searchResults);
      const searchResultTitles = $('.search-result-title', searchResults);
      const searchResultBreadcrumbs = $('.breadcrumbs', searchResults);

      expect(searchResults.length).toBe(100);
      expect(searchResultTexts.length).toBe(100);
      expect(searchResultTitles.length).toBe(100);
      expect(searchResultBreadcrumbs.length).toBe(100);

      expect(searchResults.first().attr('href')).toEqual('https://developer.swedbankpay.com/hits/1');
      expect(searchResultTitles.first().text()).toEqual('I am hit number one')
      expect(searchResultTexts.first().text()).toEqual('Highlighted text for hit number one')
      expect(searchResultBreadcrumbs.first().text()).toEqual('hits › 1')

      expect(searchResults.last().attr('href')).toEqual('https://developer.swedbankpay.com/hits/100');
      expect(searchResultTitles.last().text()).toEqual('Lead 100 – I am hit number one hundred')
      expect(searchResultTexts.last().text()).toEqual('Highlighted text for hit number one hundred')
      expect(searchResultBreadcrumbs.last().text()).toEqual('hits › 100')
    });
  });

  test('search returns no results', () => {
    mockElasticsearch(false);

    return request(app).get('/?q=nope').then(response => {
      expect(response.statusCode).toBe(200);

      document.body.innerHTML = response.text;

      expect($('.search-header h1').text()).toEqual('Results for "nope"');
      expect($('#search-content .search-results p').text()).toEqual('No results were found for "nope". Please try another search term.')
      expect($('#search-content .search-results .search-result').length).toBe(0);
    });
  });

  test('page 1', () => {
    mockElasticsearch(true);

    return request(app).get('/?q=abc&').then(response => {
      expect(response.statusCode).toBe(200);

      document.body.innerHTML = response.text;

      expect($('.search-pagination a[rel=prev]').attr('href')).toEqual('/?q=abc&page=1');
      expect($('.search-pagination a[rel=next]').attr('href')).toEqual('/?q=abc&page=2');
    });
  });

  test('page 2', () => {
    mockElasticsearch(true);

    return request(app).get('/?q=abc&page=2').then(response => {
      expect(response.statusCode).toBe(200);

      document.body.innerHTML = response.text;

      expect($('.search-pagination a[rel=prev]').attr('href')).toEqual('/?q=abc&page=1');
      expect($('.search-pagination a[rel=next]').attr('href')).toEqual('/?q=abc&page=3');
    });
  });
});
