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

  var final_query = query_splitted.map(x => `${x}~1 `).join('')
  const { body } = await client.search({
    index: 'developer-*',
    body: {
      query: {
        query_string: {
          default_field: "text",
          query: final_query,
          default_operator: "AND"
        }
      },
      highlight: {
        fields: {
          text: { fragment_size: 150, number_of_fragments: 3 }
        },
        tags_schema: "styled"
      }
    }
  })
  var results = body.hits.hits.map(x => {
    return x.highlight
  })

  //res.send(results)

  res.send([results, body])
}));

module.exports = router;
