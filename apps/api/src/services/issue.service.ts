import axios from "axios";
import type {
  GetUserDetiailsInput,
  IsSavedIssueInput,
  SaveUserIssueInput,
} from "../schemas/issues.schema.js";
import { SavedIssue } from "../models/savedIssue.model.js";

export const getIssues = async (query: string, page: string) => {
  const response = await axios.get(
    `https://api.github.com/search/issues?q=${query}&page=${page}`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_SECRET}`,
        Accept: "application/vnd.github+json",
      },
    },
  );
  return response.data;
};

export const getIssueDetails = async (payload: GetUserDetiailsInput) => {
  const res = await axios.get(
    `https://api.github.com/repos/${payload.owner}/${payload.repo}/issues/${payload.issueNumber}`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_SECRET}`,
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (res.status !== 200) throw new Error(`GitHub API error: ${res.status}`);
  return res.data;
};

export const SaveIssue = async (payload: SaveUserIssueInput) => {
  const savedIssue = await SavedIssue.create(payload);
  return savedIssue;
};

export const IsSavedIssue = async (payload: IsSavedIssueInput) => {
  const exists = await SavedIssue.findOne({
    userId: payload.userId,
    "issue.url": payload.url,
  });
  return exists;
};
