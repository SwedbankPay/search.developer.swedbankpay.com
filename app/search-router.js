import 'setimmediate';
import 'regenerator-runtime';
import asyncHandler from 'express-async-handler';
import QueryState from '../query-state.js';
import Sidebar from '../sidebar.js';
import Searcher from '../searcher.js';

export const search = asyncHandler(async (req, res) => {
  const queryState = new QueryState(req);
  const sidebar = await Sidebar.getSidebar(queryState.query);
  queryState.results = await Searcher.search(queryState);

  // const { totalPages, prevPage, nextPage, prevUrl, nextUrl } = queryState;
  // console.log({ queryState, totalPages, prevPage, nextPage, prevUrl, nextUrl });

  res.render('search', { queryState, sidebar });
});
