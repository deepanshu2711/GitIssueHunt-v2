export type Repo = {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  watchers: number;
  updatedAt: string;
  topics: string[];
  isPrivate: boolean;
};
