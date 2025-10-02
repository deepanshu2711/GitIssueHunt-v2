import type { Request, Response } from "express";
import { AppError, asyncHandler, successResponse } from "../utils/responses.js";
import * as IssuesService from "../services/issue.service.js";
import type {
  GetUserDetiailsInput,
  IsSavedIssueInput,
} from "../schemas/issues.schema.js";
import {
  getIssueDetailsSchema,
  getIssuesQuerySchema,
  isSavedIssueSchema,
} from "../schemas/issues.schema.js";
import { withRedisCache } from "../utils/withRedisCache.js";

export const getIssues = asyncHandler(async (req: Request, res: Response) => {
  const parsed = getIssuesQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw new AppError(parsed.error.message, 400);
  }

  const {
    label = "good first issue",
    lang = "javascript",
    page = "1",
  } = parsed.data;

  const safeLabel = String(label).trim();
  const safeLang = String(lang).trim();
  const pageNum = Number.parseInt(String(page), 10);
  const pageParam =
    Number.isFinite(pageNum) && pageNum > 0 ? String(pageNum) : "1";

  const query = `label:"${safeLabel}"+language:${safeLang}+state:open+is:issue`;
  const cacheKey = `issues:${safeLabel.toLowerCase()}:${safeLang.toLowerCase()}:${pageParam}`;

  const issues = await withRedisCache(
    cacheKey,
    () => IssuesService.getIssues(query, pageParam),
    {
      ttlSeconds: 600,
    },
  );
  return successResponse(res, issues, "Issues fetched succesfully");
});

export const getIssueDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = getIssueDetailsSchema.safeParse(req.query);
    if (!parsed.success) {
      throw new AppError(parsed.error.message, 400);
    }

    const { owner, repo, issueNumber } = parsed.data;
    const cacheKey = `issue-details:${owner.toLowerCase()}:${repo.toLowerCase()}:${issueNumber}`;

    const data = await withRedisCache(
      cacheKey,
      () => IssuesService.getIssueDetails(parsed.data as GetUserDetiailsInput),
      {
        ttlSeconds: 600,
      },
    );

    return successResponse(res, data, "Issue details fetched succesfully");
  },
);

export const SaveUserIssue = asyncHandler(
  async (req: Request, res: Response) => {
    const savedIssue = await IssuesService.SaveIssue(req.body);
    return successResponse(res, savedIssue, "Issue saved successfully");
  },
);

export const isIssueSaved = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = isSavedIssueSchema.safeParse(req.query);
    if (!parsed.success) {
      throw new AppError(parsed.error.message, 400);
    }
    const isSaved = await IssuesService.IsSavedIssue(
      parsed.data as IsSavedIssueInput,
    );
    return successResponse(res, { saved: !!isSaved }, "Check completed");
  },
);
