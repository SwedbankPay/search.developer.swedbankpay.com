const React = require('react');
const DefaultLayout = require('./layouts/default');
import Pagination from './pagination'
import Sidebar from './sidebar'
import SearchHeader from './search-header';
import SearchResults from './search-results';

module.exports = (props) => {
  return (
    <DefaultLayout title={props.query}>
      <Sidebar sidebar={props.sidebar} />
      <main className="doc-view">
        <div className="doc-container">
          <SearchHeader {...props} />
          <div id="search-content">
            <div className="search-results">
              <SearchResults hits={props.results.hits} />
            </div>
            <Pagination {...props} />
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};
