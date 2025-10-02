import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodObject } from "zod";
import { AppError } from "../utils/responses.js";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        return next(new AppError(e.message, 400));
      }
      return next(e);
    }
  };
