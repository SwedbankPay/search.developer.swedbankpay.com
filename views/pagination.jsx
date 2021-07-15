import React from 'react';


function btn(additionalClassName) {
  return `btn btn-primary btn-sm m-1 ${additionalClassName}`.trim();
}

export default (props) => {
  const q = props.queryState;

  if (q == null) {
    return null;
  }

  const prevDisabledCN = q.prevPage == null ? 'disabled' : '';
  const nextDisabledCN = q.nextPage == null ? 'disabled' : '';
  const pages = [];

  /*for (let i = 1; i = totalPages; i++) {
    const pageCN = page === i ? 'current-page' : '';
    const pageUrl = setPage(url, i);
    pages.push(<a key={`page-${i}`} href={pageUrl} className={btn(pageCN)}>{i + 1}</a>);
  }*/

  return (
    <div className="search-pagination">
      <a key="prev" rel="prev" href={q.prevUrl} className={btn(prevDisabledCN)}>Prev</a>
      {pages}
      <a key="next" rel="next" href={q.nextUrl} className={btn(nextDisabledCN)}>Next</a>
    </div>
  );
};
