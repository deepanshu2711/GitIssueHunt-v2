import type z from "zod";
import type { summarizeIssueSchema } from "../schemas/ai.schema.js";
import type { Response } from "express";

import { geminiAi } from "../lib/gemini.js";

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

  const data = await geminiAi.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  for await (const chunk of data) {
    const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (text) {
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    }
  }

  res.write("data: [DONE]\n\n");
  res.end();
};
