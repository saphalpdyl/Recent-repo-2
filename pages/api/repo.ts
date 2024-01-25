// IMPORTS
import type { NextApiRequest, NextApiResponse } from "next";
import Card from "@src/card"
import { fetchRepos, fetchCommits } from "@src/fetchers";
import {  GITHUB_USERNAME, SORT_BY_OPTIONS }  from "@src/constants";
import * as DEFAULTS from "@src/defaults";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    pos,
    sortBy,
    minimalism,
    backgroundColor,
    borderColor,
    commitsCount,
    disableBackgroundGrid,
 } = req.query

  // Parsing stuff
  const parsedPos = typeof pos === 'string' ? parseInt(pos) : DEFAULTS.REPO_POS;
  const parsedMinimalism = minimalism == "true" ? true : false;
  const parsedCommitsCount = typeof commitsCount === 'string' ? parseInt(commitsCount): DEFAULTS.COMMITS_COUNT; // pos = 0 means latest one
  const parsedBackgroundColor = typeof backgroundColor === 'string' ? backgroundColor : DEFAULTS.BACKGROUND_COLOR;
  const parsedBorderColor = typeof borderColor === 'string' ? borderColor : DEFAULTS.BORDER_COLOR;
  const parsedDisableBackgroundGrid = disableBackgroundGrid == "true" ? true : false;
  
  // Parsing Sort By
  const parsedSortBy = typeof sortBy === 'string' ? sortBy : DEFAULTS.SORT_BY;
  if (!SORT_BY_OPTIONS.includes(parsedSortBy)) {
    res.setHeader("Content-Type","application/json");
    res.status(400).send('"message":"Invalid sort by field"')
  }
  
  const repos = await fetchRepos(GITHUB_USERNAME, parsedSortBy);
  const repo = repos[parsedPos];
  const commits = await fetchCommits(GITHUB_USERNAME,repo.name,parsedCommitsCount);

  const card = new Card({
    repo,
    commits,
    repoPos: parsedPos,
    minimalism: parsedMinimalism,
    backgroundColor: parsedBackgroundColor,
    borderColor: parsedBorderColor,
    sortBy: parsedSortBy,
    commitsCount: parsedCommitsCount,
    disableBackgroundGrid: parsedDisableBackgroundGrid
  });
  const renderedCard = await card.renderCard();

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("access-control-allow-origin",'*');
  res.setHeader("Cache-Control","no-store");
  res.status(200).send(renderedCard);
}
