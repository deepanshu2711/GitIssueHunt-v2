import type { Request, Response } from "express";
import * as AuthService from "../services/auth.service.js";
import { errorResponse, successResponse } from "../utils/responses.js";

export const githubAuth = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.createOrFindUser(req.body);
    return successResponse(res, user);
  } catch (e) {
    return errorResponse(res, null, "Something went wrong");
  }
};
