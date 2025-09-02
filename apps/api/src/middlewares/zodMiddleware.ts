import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodObject } from "zod";
import { errorResponse } from "../utils/responses.js";

export const validate =
  (schema: ZodObject, property: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[property]);
      req[property] = parsed;
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        errorResponse(res, e.message);
      }
    }
  };
