"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn/card";
import { getRepoName } from "@web/utils/helpers";
import { ExternalLink, GitFork, Sparkles, Maximize2 } from "lucide-react";
import { GitHubIssue } from "../types";
import { Modal } from "@web/components/Modal";
import { AIButton } from "@web/components/SummarizeAiButton";
import { useSummarizeIssue } from "../hooks/mutation/useSummarizeIssue";
import { QuickActionButton } from "./QuickActionButton";
import { SaveIssueButton } from "./SaveIssueButton";

interface QuickActionsProps {
  data: GitHubIssue;
}

export const QuickActions = ({ data }: QuickActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    summary: aiSummary,
    mutate: generateSummary,
    isPending: isGenerating,
  } = useSummarizeIssue();

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <QuickActionButton
          link={data.html_url}
          label={"View on GitHub"}
          Icon={ExternalLink}
        />
        <QuickActionButton
          link={`https://github.com/${getRepoName(data.repository_url)}`}
          label={"View Repository"}
          Icon={GitFork}
        />
        <SaveIssueButton data={data} />

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
