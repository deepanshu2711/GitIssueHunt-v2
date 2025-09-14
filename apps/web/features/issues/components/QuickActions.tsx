"use client";
import { Button } from "@repo/ui/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn/card";
import { getRepoName } from "@web/utils/helpers";
import { Bookmark, Check, ExternalLink, GitFork } from "lucide-react";
import Link from "next/link";
import { GitHubIssue } from "../types";
import { useSaveUserIssue } from "../hooks/mutation/useSaveUserIssue";
import { useSession } from "next-auth/react";
import { useCheckIsSaved } from "../hooks/query/useCheckSavedIssue";
import { useQueryClient } from "@tanstack/react-query";

interface QuickActionsProps {
  data: GitHubIssue;
}
export const QuickActions = ({ data }: QuickActionsProps) => {
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

  // console.log(initialStatus, isSaved);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button asChild className="w-full">
          <Link href={data.html_url} target="_blank">
            <ExternalLink className="h-4 w-4 mr-2" />
            View on GitHub
          </Link>
        </Button>
        <Button asChild variant="secondary" className="w-full">
          <Link
            href={`https://github.com/${getRepoName(data.repository_url)}`}
            target="_blank"
          >
            <GitFork className="h-4 w-4 mr-2" />
            View Repository
          </Link>
        </Button>
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
      </CardContent>
    </Card>
  );
};
