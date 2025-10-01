"use client";
import { useState } from "react";
import { Button } from "@repo/ui/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/shadcn/dialog";
import { getRepoName } from "@web/utils/helpers";
import {
  Bookmark,
  Check,
  ExternalLink,
  GitFork,
  Cpu,
  Loader2,
  Sparkles,
  ExpandIcon,
  Expand,
  Maximize2,
  X,
} from "lucide-react";
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

  const [aiSummary, setAiSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAI = async () => {
    setAiSummary("");
    setIsGenerating(true);

    try {
      const response = await fetch(
        "http://localhost:5081/api/v1/ai/summarize-issue",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            description: data.body,
          }),
        },
      );

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const json = line.replace("data: ", "").trim();
              if (json === "[DONE]") {
                setIsGenerating(false);
                return;
              }
              try {
                const parsed = JSON.parse(json);
                setAiSummary((prev) => prev + parsed.text);
              } catch (err) {
                console.error("Failed to parse chunk:", err);
              }
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

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
          <Button
            className="w-full justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={handleGenerateAI}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {isGenerating ? "Summarizing..." : "Summarize with AI"}
          </Button>
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
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl w-full rounded-xl shadow-lg bg-white animate-slide-in p-6">
          <DialogHeader className="flex items-center flex-row  justify-between ">
            <DialogTitle className="flex gap-2 text-lg font-semibold text-gray-900">
              <Sparkles className="h-6 w-6 text-purple-500" />
              AI Summary
            </DialogTitle>
            <X
              className="text-gray-600 size-5 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
          </DialogHeader>

          <CardContent className="max-h-[70vh] overflow-y-auto">
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
          </CardContent>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
