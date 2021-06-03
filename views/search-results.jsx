const React = require('react');
import SearchForm from './search-form';

function hitText(hit) {
  if (!hit || !hit.highlight || !hit.highlight.text || !Array.isArray(hit.highlight.text)) {
    console.error('No highlight text found in hit:', hit);
    return '';
  }

  return hit.highlight.text[0];
}

function extractHits(props) {
  if (!props || !props.hits) {
    return {
      hits: null,
      lead: 'Type in the query you wish to search for below.'
    };
  } else if (props.hits.length == 0) {
    return {
      hits: null,
      lead: `No results were found for "${props.query}". Please try another search term.`
    };
  }

  return { hits: props.results.hits };
}

module.exports = (props) => {
  const { hits, lead } = extractHits(props);

  if (hits == null) {
    return (
      <div>
        <h2>Search</h2>
        <p>{lead}</p>
        <SearchForm query={props.query} />
      </div>
    );
  }

  return hits.map((hit, index) => (
    <a key={index} href={hit.url} className="cards cards-primary">
      <div className="cards-content">
        <small>{hit.url.substring(1).replace(".html", "")}</small>
        <span className="h3 mt-3">{hit.title}</span>
        <p className="mt-0" dangerouslySetInnerHTML={{ __html: hitText(hit) }}></p>
      </div>
      <i className="material-icons">arrow_forward</i>
    </a>
  ));
}
