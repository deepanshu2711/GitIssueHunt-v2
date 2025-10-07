import type {
  GetUserDetiailsInput,
  IsSavedIssueInput,
  SaveUserIssueInput,
} from "../schemas/issues.schema.js";
import { SavedIssue } from "../models/savedIssue.model.js";
import githubApi from "../providers/github.provider.js";

export const getIssues = async (query: string, page: string) => {
  const { data } = await githubApi.get(`/search/issues`, {
    params: { q: query, page },
  });
  return data;
};

export const getIssueDetails = async (payload: GetUserDetiailsInput) => {
  const { owner, repo, issueNumber } = payload;
  const { data } = await githubApi.get(
    `/repos/${owner}/${repo}/issues/${issueNumber}`,
  );
  return data;
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
