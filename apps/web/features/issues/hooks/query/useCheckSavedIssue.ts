import { useQuery } from "@tanstack/react-query";
import { IsSavedIssue } from "../../types";
import { IssueService } from "../../services";

export const useCheckIsSaved = (
  payload: IsSavedIssue,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["isIssueSaved", payload.userId, payload.url],
    queryFn: () => IssueService.isSavedIssue(payload),
    enabled: !!payload.userId && !!payload.url && (options?.enabled ?? true),
    staleTime: 5000,
  });
};
