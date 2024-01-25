import type { Commit } from "@types";
import { GITHUB_API_HEADER } from "./fetch_common";

const fetchCommits = async (
  githubUsername: string,
  repoName: string,
  numberOfCommits: number,
) : Promise<Commit[]> => {
  const response = await fetch(
    `https://api.github.com/repos/${githubUsername}/${repoName}/commits?per_page=${numberOfCommits}`,
    {
      headers: GITHUB_API_HEADER
    }
  );

  const jsonResponse = await response.json();
  return jsonResponse;
}

export { fetchCommits };
export default fetchCommits;
