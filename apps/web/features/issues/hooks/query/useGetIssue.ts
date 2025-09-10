import { useQuery } from "@tanstack/react-query";
import { GitHubIssuesResponse } from "../../types";
import { IssueService } from "../../services";

export const useGetIssues = (
  page: number = 1,
  lang: string = "javascript",
  label: string = "good first issue",
) => {
  return useQuery<GitHubIssuesResponse>({
    queryKey: ["issues", page, lang, label],
    queryFn: () => IssueService.getIssues(page, lang, label),
    staleTime: 5000,
  });
};
