require("regenerator-runtime");
const Express = require('express');
const ElasticSearch = require('@elastic/elasticsearch');
const fetch = require('node-fetch')
const asyncHandler = require('express-async-handler');

function getElasticSearchClient() {
    const elasticHosts = process.env.ELASTICSEARCH_HOSTS || 'http://192.168.1.175:9200'
    const elasticUsername = process.env.ELASTICSEARCH_USERNAME || 'none'
    const elasticPassword = process.env.ELASTICSEARCH_PASSWORD || 'none'

    return new ElasticSearch.Client({
        node: elasticHosts,
        auth: {
          username: elasticUsername,
          password: elasticPassword
        },
    });
}

async function getSidebar() {
    const response = await fetch('https://developer.stage.swedbankpay.com/sidebar.html');
    return await response.text();
}

async function hydrateSearchState(req) {
    const sidebar = await getSidebar();
    const query = req.query.q;
    const originalUrl = req.originalUrl;
    const page = req.query.page || 0;
    const size = req.query.size || 5;
    const results = [];
    const searchState = { results, query, page, size, originalUrl, sidebar };

    if (query != null) {
        searchState.startIndex = page > 0 ? size * page : 0;
        searchState.elasticQuery = query.trim().split(' ').map(x => `${x}~1 `).join('')
    }

    return searchState;
}

function mapResults(body) {
    return {
        total: body.hits.total.value,
        hits: body.hits.hits.map(x => {
            return {
                title: x._source.title,
                url: x._source.url,
                highlight: x.highlight
            }
        })
    };
}

exports.search = asyncHandler(async (req, res, next) => {
    const searchState = await hydrateSearchState(req);

    if (searchState.query != null) {
        const elasticIndex = process.env.ELASTICSEARCH_INDEX || 'test-psp-developer-*'
        const elasticSearchClient = getElasticSearchClient();
        const { body } = await elasticSearchClient.search({
            index: elasticIndex,
            body: {
                from: searchState.startIndex,
                size: searchState.size,
                query: {
                    query_string: {
                        fields: ["text", "title"],
                        query: searchState.elasticQuery,
                        default_operator: "AND"
                    }
                },
                highlight: {
                    fields: {
                        text: {
                            fragment_size: 250,
                            number_of_fragments: 3
                        }
                    },
                    tags_schema: "styled"
                }
            }
        });

        searchState.results = mapResults(body);
    }

    res.render('search', searchState);
});
