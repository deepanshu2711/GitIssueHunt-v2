import { Issue } from "@web/features/issues";

export const getIssueLink = (item: Issue) => {
  const repoPath = item.repository_url.split("/").slice(-2).join("/"); // owner/repo
  return `issues/${repoPath}/${item.number}`;
};
