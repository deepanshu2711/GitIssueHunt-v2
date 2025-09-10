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
