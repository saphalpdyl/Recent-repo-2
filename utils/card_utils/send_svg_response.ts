// IMPORTS
import type { NextApiResponse } from 'next';
import type { Commit } from '@cardutils/types';

import createCommitsSVGFromList from './create_commits';
import { TRUNCATE_CHAR_THRESHOLD } from './constants';

const sendSVGResponse = (
  res: NextApiResponse,
  title_font_size: number,
  repo_name: string,
  repo_full_name: string,
  repo_last_pushed: string,
  commits: Commit[],
  repo_size: string = '~',
  current_time: number,
) => {
  const commit_text = createCommitsSVGFromList(commits, TRUNCATE_CHAR_THRESHOLD);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('access-control-allow-origin','*');
  res.setHeader('Cache-Control','no-store');
  res.status(200);
  res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="200">
        <defs>
          <pattern id="grid_image" patternUnits="userSpaceOnUse" width="100" height="100">
            <image href="/background_grid.svg" x="0" y="0" width="600" height="200" />
          </pattern>
        </defs>
        <rect width="600" height="200" fill="url(#grid_image)" stroke="#4CCF90" stroke-width="2"/>

        <text fill="#ffffff" x="20" y="42" font-size="${title_font_size}" font-family="Segoe UI,Verdana,sans-serif" font-weight="bold">
            ${repo_name}
        </text>
        <text fill="#ffffff" x="260" y="43" fill-opacity="0.31" font-size="14" font-family="Segoe UI,Verdana,sans-serif" font-weight="100">
            ${repo_full_name}
        </text>

        <rect x="446" y="10" width="140" height="6.6" fill="#D6F57F"/>
        <rect x="487.562" y="23.2" width="98.4375" height="6.6" fill="#F5947F"/>
        <rect x="516" y="36.4" width="24.0625" height="6.6" fill="#28A5FF"/>
        <rect x="544.438" y="36.4" width="41.5625" height="6.6" fill="#28A5FF" fill-opacity="0.62"/>

        <text x="20" y="68" font-family="Segoe UI,Verdana,sans-serif" fill="#fff" font-size="16" font-weight="100" fill-opacity="0.31">
            Last pushed ${repo_last_pushed}
        </text>
        <text x="20" y="104" fill="#4CCF90" font-size="14" font-family="Segoe UI,Verdana,sans-serif" font-weight="700" >
            Recent commits
        </text>

        ${commit_text}
        
        <text x="514" y="178" fill="#fff" fill-opacity="0.31" font-size="16" font-family="Segoe UI,Verdana,sans-serif" font-weight="bold">
            ${repo_size} Kb
        </text>
        <text x="0" y="7" fill="#fff" fill-opacity="0.1" font-size="7">
            ${current_time}
        </text>
    </svg>
  `);
}

export default sendSVGResponse;
