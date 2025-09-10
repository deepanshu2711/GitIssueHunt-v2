import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodObject } from "zod";
import { errorResponse } from "../utils/responses.js";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        errorResponse(res, e.message);
      } else {
        console.error("Unexpected validation error:", e);
        errorResponse(res, "Unexpected error during validation");
      }
    }
  };
