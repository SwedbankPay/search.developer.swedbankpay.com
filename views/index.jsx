var React = require('react');
const fetch = require("node-fetch");
var DefaultLayout = require('./layouts/default');
import search from '../routes/search'

const Home = (props) => {
  return (
      <div className="search">
        Search
      </div>
  );
}

module.exports = Home;