import createCommitsSVGFromList from "@components/commits"; 
import { TRUNCATE_CHAR_THRESHOLD } from "./constants";
import type { Commit, Repository } from "@types";
import { formatWithMoment } from "./utils";
import renderBackgroundGrid from "@components/grid";

interface CardConstructor {
  repo: Repository,
  commits: Commit[],
  repoPos?: number,
  commitsCount?: number,
  sortBy?: string,
  minimalism?: boolean,
  backgroundColor?: string,
  borderColor?: string,
  disableBackgroundGrid?: boolean,
}

class Card {
  repo: Repository;
  commits: Commit[];
  repoName: string;
  commitsCount: number;
  repoPos: number;
  sortBy: string;
  minimalism: boolean;
  backgroundColor: string;
  borderColor: string;
  disableBackgroundGrid: boolean;

  constructor({
    repo,
    commits,
    repoPos,
    commitsCount,
    sortBy,
    minimalism,
    backgroundColor,
    borderColor,
    disableBackgroundGrid,

  }: CardConstructor) {
    Object.assign(this, {
      repo,
      commits,
      repoPos,
      commitsCount,
      sortBy,
      minimalism,
      backgroundColor,
      borderColor,
      disableBackgroundGrid
    });
  }

  renderTitle() {
    const titleFontSize: number = 400 / (this.repo.name.length >= 10 ? this.repo.name.length : 10);
    return `
        <text fill="#ffffff" x="20" y="42" font-size="${titleFontSize}" font-family="Segoe UI,Verdana,sans-serif" font-weight="bold">
            ${this.repo.name}
        </text>
    `
  }

  renderCommits() {
    const commitsSVG = createCommitsSVGFromList(this.commits, TRUNCATE_CHAR_THRESHOLD);
    return `
      <text x="20" y="104" fill="#4CCF90" font-size="14" font-family="Segoe UI,Verdana,sans-serif" font-weight="700" >
          Recent commits
      </text>
      ${commitsSVG}
    `
  }

  renderDesign() {
    return `
      <g>
        <rect x="446" y="10" width="140" height="6.6" fill="#D6F57F"/>
        <rect x="487.562" y="23.2" width="98.4375" height="6.6" fill="#F5947F"/>
        <rect x="516" y="36.4" width="24.0625" height="6.6" fill="#28A5FF"/>
        <rect x="544.438" y="36.4" width="41.5625" height="6.6" fill="#28A5FF" fill-opacity="0.62"/>
      </g>
    `
  }

  async renderCard() {
    const commitsSVG = this.renderCommits()
    const titleSVG = this.renderTitle()
    const designSVG = this.renderDesign()

    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="200">
        <rect width="600" height="200" fill='#${this.backgroundColor}' stroke='#${this.borderColor}' stroke-width="2"/>
        ${this.disableBackgroundGrid ? "" : renderBackgroundGrid()}

        ${titleSVG}
        <text fill="#ffffff" x="260" y="43" fill-opacity="0.31" font-size="14" font-family="Segoe UI,Verdana,sans-serif" font-weight="100">
            ${this.repo.full_name}
        </text>

        ${this.minimalism ? "" : designSVG}

        <text x="20" y="68" font-family="Segoe UI,Verdana,sans-serif" fill="#fff" font-size="16" font-weight="100" fill-opacity="0.31">
            Last pushed ${formatWithMoment(this.repo.pushed_at)}
        </text>
        ${commitsSVG}
        
        <text x="514" y="178" fill="#fff" fill-opacity="0.31" font-size="16" font-family="Segoe UI,Verdana,sans-serif" font-weight="bold">
            ${this.repo.size} Kb
        </text>
        <text x="0" y="7" fill="#fff" fill-opacity="0.1" font-size="7">
          123456789
        </text>
    </svg>
    `
  }
}

export { Card };
export default Card;
