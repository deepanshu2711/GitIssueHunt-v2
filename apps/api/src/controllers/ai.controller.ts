import { asyncHandler } from "../utils/responses.js";
import type { Request, Response } from "express";
import * as AIService from "../services/ai.service.js";

export const summarizeIssue = asyncHandler(
  async (req: Request, res: Response) => {
    await AIService.summarizeIssue(req.body, res);
  },
);
