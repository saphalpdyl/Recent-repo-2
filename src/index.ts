import type { NextApiRequest, NextApiResponse } from "next";

import { fetchRepos, fetchCommits } from "./fetchers";

import {
  COMMITS_TO_REQUEST,
  GITHUB_USERNAME,
  SORT_BY
} from "./constants";
import sendSVGResponse from "@components/svg_card";

export const card = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // Extracting query
  const posParam = req.query['pos'];
  const repoPos = typeof posParam === 'string' ? parseInt(posParam) || 0 : 0; // pos = 0 means latest one

  const repos = await fetchRepos(GITHUB_USERNAME, SORT_BY);
  const repo = repos[repoPos];

  // Repo information
  const repoLastPushed = moment.utc(repo.pushed_at).local().startOf("seconds").fromNow();
  const repoFullName = repo.full_name;
  const repoName = repo.name;
  const repoSize = repo.size;

  const commits = await fetchCommits(GITHUB_USERNAME,repoName,COMMITS_TO_REQUEST);
  // Getting currrent time to check if github is still caching images or not
  const currentDate = new Date();
  const currentTime = currentDate.getTime();

  // Calculating dynamic font size for title
  // Clamping fontsize to 40 until 10 characters
  const titleFontSize: number = 400 / (repoName.length >= 10 ? repoName.length : 10);
  
  sendSVGResponse(
    res,
    titleFontSize,
    repoName,
    repoFullName,
    repoLastPushed,
    commits,
    repoSize,
    currentTime
  );
}
