// IMPORTS
import type { NextApiRequest, NextApiResponse } from "next";
// import { card } from "@src/index";
import Card from "@src/card"
import { fetchRepos, fetchCommits } from "@src/fetchers";
import { COMMITS_TO_REQUEST, GITHUB_USERNAME, SORT_BY } from "@src/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posParam = req.query['pos'];
  const repoPos = typeof posParam === 'string' ? parseInt(posParam) || 0 : 0; // pos = 0 means latest one
  
  const repos = await fetchRepos(GITHUB_USERNAME, SORT_BY);
  const repo = repos[repoPos];
  
  const commits = await fetchCommits(GITHUB_USERNAME,repo.name,COMMITS_TO_REQUEST);

  const card = new Card({
    repo,
    commits,
    repoPos,
  });
  const renderedCard = await card.renderCard();

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("access-control-allow-origin",'*');
  res.setHeader("Cache-Control","no-store");
  res.status(200).send(renderedCard);
}
