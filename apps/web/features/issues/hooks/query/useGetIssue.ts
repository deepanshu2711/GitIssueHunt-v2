import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../../services/issueService";
import { GitHubIssuesResponse } from "../../types";

export const useGetIssues = (
  page: number = 1,
  lang: string = "javascript",
  label: string = "good first issue",
) => {
  return useQuery<GitHubIssuesResponse>({
    queryKey: ["issues", page, lang, label],
    queryFn: () => getIssues(page, lang, label),
    staleTime: 5000,
  });
};
