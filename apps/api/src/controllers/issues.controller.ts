import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses.js";
import * as IssuesService from "../services/issue.service.js";

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
