var express = require('express');
var router = express.Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const asyncHandler = require('express-async-handler')

router.get('/', asyncHandler(async (req, res, next) => {
  var return_message = "error"
  const { body } = await client.search({
    index: 'developer-*',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { quote: 'reversal' }
      }
    }
  })

  res.send(return_message)
}));

module.exports = router;
