// IMPORTS
import type { NextApiRequest, NextApiResponse } from "next";
import type { Repository, Commit } from "@cardutils/types";
import moment from 'moment';

import {
  COMMITS_TO_REQUEST,
  GITHUB_USERNAME,
  SORT_BY
} from "./constants";
import sendSVGResponse from './send_svg_response';

const GITHUB_API_HEADER = new Headers({
  'Authorization' : `Bearer ${process.env.GITHUB_TOKEN}`,
  'Content-Type' : 'application/json'
})

export const card = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // Extracting query
  const pos_param = req.query['pos'];
  const repo_pos = typeof pos_param === 'string' ? parseInt(pos_param) || 0 : 0; // pos = 0 means latest one

  const repo_response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=${SORT_BY}&order=desc`,
    {
      headers: GITHUB_API_HEADER
    }
  );
  const json_response: Repository[] = await repo_response.json();
  const repo = json_response[repo_pos];

  // Repo information
  const repo_last_pushed = moment.utc(repo['pushed_at']).local().startOf("seconds").fromNow();
  const repo_full_name : string = repo['full_name'];
  const repo_name : string = repo['name'];
  const repo_size : string = repo['size'];

  const commits_response = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${repo_name}/commits?per_page=${COMMITS_TO_REQUEST}`,
    {
      headers: GITHUB_API_HEADER
    }
  );
  const commits : Commit[] = await commits_response.json();

  // Getting currrent time to check if github is still caching images or not
  const current_date = new Date();
  const current_time = current_date.getTime();

  // Calculating dynamic font size for title
  // Clamping fontsize to 40 until 10 characters
  const title_font_size: number = 400 / (repo_name.length >= 10 ? repo_name.length : 10);
  
  sendSVGResponse(
    res,
    title_font_size,
    repo_name,repo_full_name,
    repo_last_pushed,
    commits,
    repo_size,
    current_time
  );
}
