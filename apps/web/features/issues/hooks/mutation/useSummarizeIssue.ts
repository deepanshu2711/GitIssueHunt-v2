import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { IssueService } from "../../services";
import { SummarizeIssuePayload } from "../../types";
import { toast } from "sonner";

export function useSummarizeIssue() {
  const [summary, setSummary] = useState("");

  const mutation = useMutation({
    mutationFn: ({ title, description }: SummarizeIssuePayload) =>
      IssueService.summarizeIssueService({ title, description }, (chunk) => {
        setSummary((prev) => prev + chunk);
      }),
    onError: (error: any) => {
      console.log("error", error);
      toast.error(error?.message || "Something went wrong");
    },
  });

  return {
    summary,
    ...mutation,
  };
}
