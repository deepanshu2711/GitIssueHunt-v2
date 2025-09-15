import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.js";
import * as IssuesService from "../services/issue.service.js";
import type {
  GetUserDetiailsInput,
  IsSavedIssueInput,
} from "../schemas/issues.schema.js";
import { withRedisCache } from "../utils/withRedisCache.js";

export const getIssues = async (req: Request, res: Response) => {
  const {
    label = "good first issue",
    lang = "javascript",
    page = "1",
  } = req.query;
  try {
    const query = `label:"${label}"+language:${lang}+state:open+is:issue`;
    const cacheKey = `issues:${label}:${lang}:${page}`;
    const issues = await withRedisCache(
      cacheKey,
      () => IssuesService.getIssues(query, page as string),
      {
        ttlSeconds: 600,
      },
    );
    return successResponse(res, issues, "Issues fetched succesfully");
  } catch (e) {
    return errorResponse(res, null, "Something went wrong");
  }
};

export const getIssueDetails = async (req: Request, res: Response) => {
  try {
    const cacheKey = `issue-details:${req.query.owner}:${req.query.repo}:${req.query.issueNumber}`;

    const data = await withRedisCache(
      cacheKey,
      () => IssuesService.getIssueDetails(req.query as GetUserDetiailsInput),
      {
        ttlSeconds: 600,
      },
    );

    return successResponse(res, data, "Issue details fetched succesfully");
  } catch (e) {
    return errorResponse(res, null, "Something went wrong");
  }
};

export const SaveUserIssue = async (req: Request, res: Response) => {
  try {
    const savedIssue = await IssuesService.SaveIssue(req.body);
    return successResponse(res, savedIssue, "Issue saved successfully");
  } catch (e) {
    return errorResponse(res, null, "Something went wrong");
  }
};

export const isIssueSaved = async (req: Request, res: Response) => {
  try {
    const isSaved = await IssuesService.IsSavedIssue(
      req.query as IsSavedIssueInput,
    );
    return successResponse(res, { saved: !!isSaved }, "Check completed");
  } catch (e) {
    return errorResponse(res, e, "Something went wrong");
  }
};
