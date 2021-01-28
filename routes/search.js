var Express = require('express');
var router = Express.Router();
var Client = require('@elastic/elasticsearch');

const elasticUrl = process.env.elasticUrl || 'http://192.168.1.175:9200'
const elasticUsername = process.env.elasticUsername || 'none'
const elasticPassword = process.env.elasticPassword || 'none'
const elasticIndex = process.env.elasticIndex || 'devportal'

const client = new Client.Client({
  node: elasticUrl,
  auth: {
    username: elasticUsername,
    password: elasticPassword
  },
})
var asyncHandler = require('express-async-handler');


router.get('/', asyncHandler(async (req, res, next) => {
  var query = req.query.q + ''; //Force into a string
  if (query == null || query.length == 0) {
    query = "developer portal"
  }
  var startIndex = req.query.page;
  if (startIndex == null)
    startIndex = 0;
  var querySize = req.query.size;
  if (querySize == null)
    querySize = 10;

  var query_splitted = query.trim().split(' ')
  var final_query = query_splitted.map(x => `${x}~1 `).join('')

  const {
    body
  } = await client.search({
    index: elasticIndex,
    body: {
      from: startIndex,
      size: querySize,
      query: {
        query_string: {
          default_field: "text",
          query: final_query,
          default_operator: "AND"
        }
      },
      highlight: {
        fields: {
          text: {
            fragment_size: 150,
            number_of_fragments: 3
          }
        },
        tags_schema: "styled"
      }
    }
  })


  let results = {};
  results.hits = body.hits.hits.map(x => {
    return {
      title: x.title,
      url: x._source.url,
      highlight: x.highlight
    }
  })
  results.total = body.hits.total.value;

  res.send(results)
}));

exports.searchRouter = router;