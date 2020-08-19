var express = require('express');
var router = express.Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const asyncHandler = require('express-async-handler')

router.get('/:?', asyncHandler(async (req, res, next) => {
  var query = req.params.query;
  if (query == null || query.length == 0) {
    query = "developer portal"
  }
  const { body } = await client.search({
    index: 'developer-*',
    body: {
      query: {
        match_phrase: { quote: query }
      }
    }
  })

  res.send(body)
}));

module.exports = router;
