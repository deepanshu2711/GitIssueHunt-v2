import type { Request, Response } from "express";
import * as AuthService from "../services/auth.service.js";
import { asyncHandler, successResponse } from "../utils/responses.js";

export const githubAuth = asyncHandler(async (req: Request, res: Response) => {
  const user = await AuthService.createOrFindUser(req.body);
  return successResponse(res, user);
});
