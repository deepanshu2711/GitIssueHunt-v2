import { useQuery } from "@tanstack/react-query";
import { IssueService } from "../../services";

export const useGetIssueDetails = (
  owner: string,
  repo: string,
  issueId: string,
) => {
  return useQuery({
    queryKey: ["issue", owner, repo, issueId],
    queryFn: () => IssueService.getIssueDetails(owner, repo, issueId),
    staleTime: 5000,
  });
};
