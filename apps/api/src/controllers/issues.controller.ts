import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.js";
import * as IssuesService from "../services/issue.service.js";
import type { GetUserDetiailsInput } from "../schemas/issues.schema.js";

export const getIssues = async (req: Request, res: Response) => {
  const {
    label = "good first issue",
    lang = "javascript",
    page = "1",
  } = req.query;
  try {
    const query = `label:"${label}"+language:${lang}+state:open+is:issue`;
    console.log("this is query", query);
    const issues = await IssuesService.getIssues(query, page as string);
    return successResponse(res, issues, "Issues fetched succesfully");
  } catch (e) {
    return errorResponse(res, null, "Something went wrong");
  }
};

export const getIssueDetails = async (req: Request, res: Response) => {
  try {
    const payload = req.query as unknown as GetUserDetiailsInput;
    console.log("payload", payload);
    const data = await IssuesService.getIssueDetails(payload);
    return successResponse(res, data, "Issue details fetched succesfully");
  } catch (e) {
    return errorResponse(res, null, "Something went wrong");
  }
};
