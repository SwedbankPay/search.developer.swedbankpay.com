var express = require('express');
var router = express.Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

router.get('/', async (req, res, next) => {
  var return_message = "error"
  try {
    const { body } = await client.search({
      index: 'developer-*',
      // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
      body: {
        query: {
          match: { quote: 'reversal' }
        }
      }
    })

    return next(error);
  } catch (error) {
    return_message = JSON.stringify(error);
  }

  res.send(return_message)
});

module.exports = router;
