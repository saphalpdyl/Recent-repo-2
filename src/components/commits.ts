// IMPORTS
import type { Commit } from "@types";
import { truncateString } from "../utils";

const createCommitsSVGFromList = (
  commit_list: Commit[], 
  truncate_char_threshold: number
) => {

  let commitCount = 0;
  let commitText = "";
  for (const commit of commit_list) {
    const sha = commit.sha.substring(0,7);
    const desc = commit.commit.message;
    commitText += createCommitText(sha,truncateString(desc,truncate_char_threshold),commitCount)

    commitCount++;
  }
  
  return commitText;
}

const createCommitText = (
  sha: string,
  commit_msg: string,
  commit_no: number
) => {
  return `
      <text x="20" y="${130 + 24 * commit_no}" fill="#fff" font-size="12" font-family="Segoe UI,Verdana,sans-serif" font-weight="bold">
          ${sha} -
      </text>
      <text x="80" y="${130 + 24 * commit_no}" fill="#fff" font-size="12" font-family="Segoe UI,Verdana,sans-serif">
          ${
              commit_msg.replace(/&/g, '&amp;')
                      .replace(/"/g, '&quot;')
                      .replace(/'/g, '&apos;')
                      .replace(/>/g, '&gt;')
                      .replace(/</g, '&lt;')
          }
      </text>
  `;
}

export { createCommitsSVGFromList }
export default createCommitsSVGFromList;
