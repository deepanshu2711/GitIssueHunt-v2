import { Button } from "@repo/ui/components/shadcn/button";
import { useCheckIsSaved } from "../hooks/query/useCheckSavedIssue";
import { useSaveUserIssue } from "../hooks/mutation/useSaveUserIssue";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { GitHubIssue } from "../types";
import { Bookmark, Check } from "lucide-react";

interface SaveIssueButtonProps {
  data: GitHubIssue;
}
export const SaveIssueButton = ({ data }: SaveIssueButtonProps) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { data: isSaved, isLoading: isChecking } = useCheckIsSaved({
    userId: session?.user._id!,
    url: data.html_url,
  });

  const { mutate: saveIssue, isPending } = useSaveUserIssue({
    onMutate: async (newIssue) => {
      await queryClient.cancelQueries({
        queryKey: ["isIssueSaved", newIssue.userId, newIssue.issue.url],
      });
      queryClient.setQueryData(
        ["isIssueSaved", newIssue.userId, newIssue.issue.url],
        true,
      );
    },
    onError: (_err, newIssue) => {
      queryClient.setQueryData(
        ["isIssueSaved", newIssue.userId, newIssue.issue.url],
        false,
      );
    },
    onSettled: (_data, _error, newIssue) => {
      queryClient.invalidateQueries({
        queryKey: ["isIssueSaved", newIssue.userId, newIssue.issue.url],
      });
    },
  });

  return (
    <Button
      onClick={() =>
        saveIssue({
          userId: session?.user._id!,
          repository: {
            owner: data.user.login,
            name: data.repository_url.split("/").slice(-2).join("/"),
            url: data.repository_url,
          },
          issue: {
            number: 212,
            url: data.html_url,
            title: data.title,
            status: data.state,
            savedAt: new Date(),
          },
        })
      }
      disabled={isPending || isChecking || isSaved}
      variant="secondary"
      className="w-full"
    >
      {isSaved ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Saved
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 mr-2" />
          Save Issue
        </>
      )}
    </Button>
  );
};
