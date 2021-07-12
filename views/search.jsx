import React from 'react';
import DefaultLayout from './layouts/default';
import Pagination from './pagination'
import Sidebar from './sidebar'
import SearchHeader from './search-header';
import SearchResults from './search-results';

export default (props) => {
  return (
    <DefaultLayout title={props.query}>
      <Sidebar sidebar={props.sidebar} query={props.query} />
      <main className="doc-view">
        <div className="doc-container">
          <SearchHeader {...props} />
          <div id="search-content">
            <div className="search-results">
              <SearchResults {...props} />
            </div>
            <Pagination {...props} />
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};
