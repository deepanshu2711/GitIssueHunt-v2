import type { Response } from "express";
import type z from "zod";
import { summarizeIssueStream } from "../providers/ai.provider.js";
import type { summarizeIssueSchema } from "../schemas/ai.schema.js";

type SummarizeIssueSchema = z.infer<typeof summarizeIssueSchema>;

export const summarizeIssue = async (
  payload: SummarizeIssueSchema,
  res: Response,
) => {
  const { title, description } = payload;
  const prompt = `You are an assistant that summarizes GitHub issues. Issue title: ${title} body: ${description} Summarize this issue in 2–3 sentences (50–100 words), focusing on the problem and possible solution.`;

  // Set headers for SSE (Server-Sent Events)
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  for await (const text of summarizeIssueStream(prompt)) {
    res.write(`data: ${JSON.stringify({ text })}\n\n`);
  }

  res.write("data: [DONE]\n\n");
  res.end();
};
