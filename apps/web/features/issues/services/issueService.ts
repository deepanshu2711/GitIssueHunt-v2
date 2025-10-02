import api from "@web/lib/api";
import { IsSavedIssue, SaveUserIssue, SummarizeIssuePayload } from "../types";
import { toast } from "sonner";

const getIssues = async (page?: number, lang?: string, label?: string) =>
  (await api.get(`/issues?page=${page}&lang=${lang}&label=${label}`)).data.data;

const getIssueDetails = async (
  owner: string,
  repo: string,
  issueId: string,
) => {
  const { data } = await api.get(
    `/issues/details?owner=${owner}&repo=${repo}&issueNumber=${issueId}`,
  );
  return data;
};

const saveUserIssue = async (payload: SaveUserIssue) => {
  const { data } = await api.post(`/issues/save`, payload);
  return data;
};

const isSavedIssue = async (payload: IsSavedIssue) => {
  console.log("payload issavedissue", payload);
  const { data } = await api.get(
    `/issues/saved/check?userId=${payload.userId}&url=${payload.url}`,
  );
  return data.data.saved;
};

export const summarizeIssueService = async (
  { title, description }: SummarizeIssuePayload,
  onChunk?: (text: string) => void,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ai/summarize-issue`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    },
  );

  console.log(response);

  if (response.status === 429) {
    throw new Error("You have reached your daily AI summary limit.");
  }

  if (!response.body) throw new Error("No response body");

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let done = false;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const json = line.replace("data: ", "").trim();
          if (json === "[DONE]") return;
          try {
            const parsed = JSON.parse(json);
            if (parsed.text && onChunk) {
              onChunk(parsed.text);
            }
          } catch (err) {
            console.error("Failed to parse chunk:", err);
          }
        }
      }
    }
  }
};

export default {
  getIssues,
  getIssueDetails,
  saveUserIssue,
  isSavedIssue,
  summarizeIssueService,
};
