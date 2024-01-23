export interface Repository {
  name: string,
  full_name: string,
  size: string,
  pushed_at: string,
}

export interface Commit {
  sha: string,
  commit: CommitDetail
}

export interface CommitDetail {
  message: string,
}
