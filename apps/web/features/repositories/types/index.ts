export type Repo = {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks: number;
  watchers: number;
  updated_at: string;
  topics: string[];
  isPrivate: boolean;
  owner: {
    avatar_url: string;
  };
};

export type GitHubRepoResponse = {
  total_count: number;
  items: Repo[];
};
