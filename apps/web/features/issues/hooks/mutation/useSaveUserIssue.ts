import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { IssueService } from "../../services";
import { SaveUserIssue } from "../../types";

export const useSaveUserIssue = (
  options?: UseMutationOptions<any, Error, SaveUserIssue>,
) => {
  return useMutation({
    mutationFn: (payload: SaveUserIssue) => IssueService.saveUserIssue(payload),
    ...options,
  });
};
