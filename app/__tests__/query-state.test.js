import QueryState from '../query-state.js';

describe(QueryState, () => {
  test('empty returns instance', () => {
    expect(new QueryState({})).toBeInstanceOf(QueryState);
  });

  test('no query returns defaults', () => {
    const queryState = new QueryState({});

    expect(queryState.page).toBe(1);
    expect(queryState.size).toBe(5);
    expect(queryState.url).toBe(null);
    expect(queryState.results).toBe(null);
    expect(queryState.query).toBe(null);
    expect(queryState.startIndex).toBe(0);
    expect(queryState.elasticQuery).toBe(null);
  });

  test('query with no results', () => {
    const queryState = new QueryState({ originalUrl: '/?page=1&size=10&q=payment+url', protocol: 'http', hostname: 'example.com' });

    expect(queryState.page).toBe(1);
    expect(queryState.size).toBe(10);
    expect(queryState.totalPages).toBe(0);
    expect(queryState.prevPage).toBe(null);
    expect(queryState.nextPage).toBe(null);
    expect(queryState.url.toString()).toBe('http://example.com/?page=1&size=10&q=payment+url');
    expect(queryState.prevUrl).toBe('/?page=1&size=10&q=payment+url');
    expect(queryState.nextUrl).toBe('/?page=1&size=10&q=payment+url');
    expect(queryState.results).toBe(null);
    expect(queryState.query).toBe('payment url');
    expect(queryState.startIndex).toBe(0);
    expect(queryState.elasticQuery).toBe('payment~1 url~1');
  });

  test('page 3', () => {
    const queryState = new QueryState({ originalUrl: '/?page=3&q=payment', protocol: 'http', hostname: 'example.com' });
    queryState.results = { total: 123, hits: [] };

    expect(queryState.page).toBe(3);
    expect(queryState.size).toBe(5);
    expect(queryState.totalPages).toBe(25);
    expect(queryState.prevPage).toBe(2);
    expect(queryState.nextPage).toBe(4);
    expect(queryState.url.toString()).toBe('http://example.com/?page=3&q=payment');
    expect(queryState.prevUrl).toBe('/?page=2&q=payment');
    expect(queryState.nextUrl).toBe('/?page=4&q=payment');
    expect(queryState.results).not.toBe(null);
    expect(queryState.results.total).toBe(123);
    expect(queryState.results.hits).toBeInstanceOf(Array);
    expect(queryState.query).toBe('payment');
    expect(queryState.startIndex).toBe(10);
    expect(queryState.elasticQuery).toBe('payment~1');
  });

  test('page 25', () => {
    const queryState = new QueryState({ originalUrl: '/?page=25&q=payment', protocol: 'http', hostname: 'example.com' });
    queryState.results = { total: 123, hits: [] };

    expect(queryState.page).toBe(25);
    expect(queryState.size).toBe(5);
    expect(queryState.totalPages).toBe(25);
    expect(queryState.prevPage).toBe(24);
    expect(queryState.nextPage).toBe(null);
    expect(queryState.url.toString()).toBe('http://example.com/?page=25&q=payment');
    expect(queryState.prevUrl).toBe('/?page=24&q=payment');
    expect(queryState.nextUrl).toBe('/?page=25&q=payment');
    expect(queryState.results).not.toBe(null);
    expect(queryState.results.total).toBe(123);
    expect(queryState.results.hits).toBeInstanceOf(Array);
    expect(queryState.query).toBe('payment');
    expect(queryState.startIndex).toBe(120);
    expect(queryState.elasticQuery).toBe('payment~1');
  });
});
