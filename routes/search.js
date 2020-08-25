import Express from 'express';
var router = Express.Router();
import {
  Client
} from '@elastic/elasticsearch';
const client = new Client({
  node: 'http://localhost:9200'
})
import asyncHandler from 'express-async-handler';


router.get('/', asyncHandler(async (req, res, next) => {
  var query = req.query + ''; //Force into a string
  if (query == null || query.length == 0) {
    query = "developer portal"
  }
  var query_splitted = query.split(' ')

  var final_query = query_splitted.map(x => `${x}~1 `).join('')

  const {
    body
  } = await client.search({
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
          text: {
            fragment_size: 150,
            number_of_fragments: 3
          }
        },
        tags_schema: "styled"
      }
    }
  })
  var results = body.hits.hits.map(x => {
    return x.highlight
  })

  //res.send(results)

  res.send([final_query, results, body])
}));

export default router;