import 'regenerator-runtime';
import 'setimmediate';
import { Client } from '@elastic/elasticsearch';
import fetch from 'node-fetch';
import asyncHandler from 'express-async-handler';
const baseUrl = process.env.ENV === 'stage'
    ? 'https://developer.stage.swedbankpay.com'
    : 'https://developer.swedbankpay.com';

function getElasticSearchClient() {
    const elasticHosts = process.env.ELASTICSEARCH_HOSTS || 'http://192.168.1.175:9200';
    const elasticUsername = process.env.ELASTICSEARCH_USERNAME || 'none';
    const elasticPassword = process.env.ELASTICSEARCH_PASSWORD || 'none';

    return new Client({
        node: elasticHosts,
        auth: {
          username: elasticUsername,
          password: elasticPassword
        },
    });
}

async function getSidebar() {
    // TODO: Find out a way to fetch the sidebar inside app.js or somewhere more global
    const response = await fetch('https://developer.stage.swedbankpay.com/sidebar.html');
    return await response.text();
}

async function hydrateSearchState(req) {
    const sidebar = await getSidebar();
    const query = req.query.q;
    const originalUrl = req.originalUrl;
    const page = req.query.page || 0;
    const size = req.query.size || 5;
    const results = null;
    const searchState = { results, query, page, size, originalUrl, sidebar };

    if (query != null) {
        searchState.startIndex = page > 0 ? size * page : 0;
        searchState.elasticQuery = query.trim().split(' ').map(x => `${x}~1 `).join('')
    }

    return searchState;
}

function mapHit(hit) {
    const url = new URL(hit._source.url, baseUrl)

    return {
        title: hit._source.title,
        url: url.href,
        highlight: hit.highlight
    };
}

export const search = asyncHandler(async (req, res, next) => {
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

        searchState.results = {
            total: body.hits.total.value,
            hits: body.hits.hits.map(mapHit)
        };
    } else {
        searchState.results = { hits: [] };
    }

    res.render('search', searchState);
});
