import type { Repository } from "@types";
import { GITHUB_API_HEADER } from "./fetch_common";

const fetchRepos = async (
  githubUsername : string,
  sortBy: string
) : Promise<Repository[]> => {
  const response =  await fetch(
    `https://api.github.com/users/${githubUsername}/repos?sort=${sortBy}&order=desc`,
    {
      headers: GITHUB_API_HEADER
    }
  );

  if (response.status == 404)
    throw new Error('{"message": "User Not Found"}',{
    cause: "USER_NOT_FOUND"
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}

export { fetchRepos };
export default fetchRepos;
