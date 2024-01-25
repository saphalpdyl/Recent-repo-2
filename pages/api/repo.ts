// IMPORTS
import type { NextApiRequest, NextApiResponse } from "next";
import Card from "@src/card"
import { fetchRepos, fetchCommits } from "@src/fetchers";
import { SORT_BY_OPTIONS }  from "@src/constants";
import * as DEFAULTS from "@src/defaults";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    username,
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
  const parsedMinimalism = minimalism === "true" ? true : false;
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

  // Parsing and validating username
  const parsedUsername = typeof username === 'string' ? username : "";
  
  try {
    const repos = await fetchRepos(parsedUsername, parsedSortBy);
    const repo = repos[parsedPos];
    const commits = await fetchCommits(parsedUsername,repo.name,parsedCommitsCount);

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
  catch (e : any) {
    res.setHeader("Content-Type", "application/json");
    switch (e.cause) {
      case "USER_NOT_FOUND":
        res.status(400).send(e.message)
        break;

      default:
        res.status(500).send("500 Server Error")
        break;
    }
  }

}
