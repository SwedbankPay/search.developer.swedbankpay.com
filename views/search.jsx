var React = require('react');
var DefaultLayout = require('./layouts/default');
import Pagination from './pagination'
import Sidebar from './sidebar'

const HelloMessage = (props) => {
  const { hits, total } = props.results

  function hitText(hit) {
    if (!hit || !hit.highlight || !hit.highlight.text || !Array.isArray(hit.highlight.text)) {
      console.error('No highlight text found in hit:', hit);
      return '';
    }

    return hit.highlight.text[0];
  }

  return (
    <DefaultLayout title={props.query}>
      { props != undefined && <><Sidebar sidebar={props.sidebar} />
      <main className="doc-view">
        <div className="doc-container">
          <div className="search-header">
            <div className="doc-container py-5">
              <p className="mb-0">Search</p>
              <h1 className="my-2">Results for "{props.query}"</h1>
              <small className="total-results">{total} results found</small>
            </div>
          </div>
          <div id="search-content">
            <div className="search-results">{hits.map((hit, index) => (
              <a key={index} href={hit.url} className="cards cards-primary">
                <div className="cards-content">
                  <small>{hit.url.substring(1).replace(".html", "")}</small>
                  <span className="h3 mt-3">{hit.title}</span>
                  <p className="mt-0" dangerouslySetInnerHTML={{ __html: hitText(hit) }}></p>
                </div>
                <i className="material-icons">arrow_forward</i>
              </a>
            ))}</div>
            <Pagination total={total} current_page={props.page} size={props.size} originalUrl={props.originalUrl}/>
          </div>
        </div>
      </main></>}
    </DefaultLayout>
  );
}

module.exports = HelloMessage;
