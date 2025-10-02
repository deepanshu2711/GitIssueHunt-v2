"use client";
import { useState } from "react";
import { Button } from "@repo/ui/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn/card";
import { getRepoName } from "@web/utils/helpers";
import {
  Bookmark,
  Check,
  ExternalLink,
  GitFork,
  Sparkles,
  Maximize2,
} from "lucide-react";
import Link from "next/link";
import { GitHubIssue } from "../types";
import { useSaveUserIssue } from "../hooks/mutation/useSaveUserIssue";
import { useSession } from "next-auth/react";
import { useCheckIsSaved } from "../hooks/query/useCheckSavedIssue";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "@web/components/Modal";
import { AIButton } from "@web/components/SummarizeAiButton";
import { useSummarizeIssue } from "../hooks/mutation/useSummarizeIssue";

interface QuickActionsProps {
  data: GitHubIssue;
}

export const QuickActions = ({ data }: QuickActionsProps) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const {
    summary: aiSummary,
    mutate: generateSummary,
    isPending: isGenerating,
  } = useSummarizeIssue();

  console.log("summary", aiSummary);

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

        {!aiSummary && (
          <AIButton
            onClick={() =>
              generateSummary({ title: data.title, description: data.body! })
            }
            isLoading={isGenerating}
          >
            <Sparkles className="h-4 w-4" />
          </AIButton>
        )}

        {aiSummary && (
          <Card className="mt-4  border border-gray-200 bg-gray-50 rounded-lg shadow-sm">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                <CardTitle className="text-sm font-medium text-gray-700">
                  AI Summary
                </CardTitle>
              </div>
              <Maximize2
                className="text-gray-600 size-4 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            </CardHeader>
            <CardContent className="max-h-40 overflow-y-auto">
              <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                {aiSummary}
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="AI Summary"
        icon={<Sparkles className="h-6 w-6 text-purple-500" />}
      >
        <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
          {aiSummary}
        </p>

        <div className="mt-4 border-t border-gray-200 pt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            <span className="font-medium text-blue-500">
              5 AI summaries per day
            </span>
            . This helps manage server resources and ensures fair usage for
            everyone.
          </p>
        </div>
      </Modal>
    </Card>
  );
};
