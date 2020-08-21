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
  var query_splitted = query.split(' ')

  var final_query = ""
  // This adds a ~2 after each word to support fuzzy seach
  query_splitted.forEach((value) => {
    final_query += `${value}~2 `
  })
  const { body } = await client.search({
    index: 'developer-*',
    body: {
      query: {
        query_string: {
          default_field: "text",
          query: query_splitted,
          default_operator: "AND"
        }
      },
      highlight: {
        fields: {
          text: {}
        }
      }
    }
  })

  res.send(body)
}));

module.exports = router;
