class QueryState {
  constructor(req) {
    this.url = req.originalUrl
      ? new URL(req.originalUrl, `${req.protocol}://${req.hostname}`)
      : null;
    this.page = this.getIntParam('page', 1);
    this.size = this.getIntParam('size', 5);
    this.query = this.url ? this.url.searchParams.get('q') : null;
    this.results = null;
    const index = this.page - 1;
    this.startIndex = index > 0 ? this.size * index : 0;
    this.elasticQuery = this.query
      ? this.query.trim().split(' ').map(x => `${x}~1`).join(' ')
      : null;
  }

  get totalPages() {
    const total = this.results && this.results.total > 0
      ? this.results.total
      : 0;

    return (total == 0) ? 0 : Math.ceil(total / this.size);
  }

  get prevPage() {
    return this.page > 1 ? this.page - 1 : null;
  }

  get nextPage() {
    return this.page < this.totalPages ? this.page + 1 : null;
  }

  get prevUrl() {
    return this.setPage(this.prevPage);
  }

  get nextUrl() {
    return this.setPage(this.nextPage);
  }

  setPage(page) {
    if (this.url === null) {
      return null;
    }

    const u = new URL(this.url.toString());
    const p = page || this.page;
    u.searchParams.set('page', p);
    return `${u.pathname}?${u.searchParams}`;
  }

  getIntParam(paramName, defaultValue) {
    const param = this.url ? this.url.searchParams.get(paramName) : null;
    const value = parseInt(param, 10);
    return isNaN(value) || value < 1 ? defaultValue : value;
  }
}

export default QueryState;
