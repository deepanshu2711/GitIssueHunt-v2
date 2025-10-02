export type Label = {
  id: number;
  name: string;
  color: string;
};

export type Issue = {
  title: string;
  body: string;
  html_url: string;
  labels: Label[];
  user: { avatar_url: string; login: string };
  repository_url: string;
  number: number;
};

export type Option = {
  value: string;
  label: string;
};

export type GitHubIssuesResponse = {
  total_count: number;
  items: Issue[];
};

// types/github.ts

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  user_view_type: string;
}

export interface GitHubLabel {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description?: string;
  color: string;
  default: boolean;
}

export interface GitHubReactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface GitHubIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GitHubUser;
  labels: GitHubLabel[];
  state: "open" | "closed";
  locked: boolean;
  assignee: GitHubUser | null;
  assignees: GitHubUser[];
  milestone: any | null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  active_lock_reason: string | null;
  body: string | null;
  reactions: GitHubReactions;
  timeline_url: string;
  performed_via_github_app: any | null;
  state_reason: string | null;
  issue_dependencies_summary?: any;
  sub_issues_summary?: any;
  closed_by?: GitHubUser | null;
}

export type Repository = {
  owner: string;
  name: string;
  url: string;
};

export type SaveIssue = {
  number: number;
  url: string;
  title: string;
  body?: string;
  labels?: string[];
  status: "open" | "closed";
  savedAt?: Date;
};

export type SaveUserIssue = {
  userId: string;
  repository: Repository;
  issue: SaveIssue;
};

export type IsSavedIssue = {
  userId: string;
  url: string;
};

export type SummarizeIssuePayload = {
  title: string;
  description: string;
};
