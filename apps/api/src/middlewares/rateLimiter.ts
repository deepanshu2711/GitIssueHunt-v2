import type { NextFunction, Request, Response } from "express";
import { redis } from "../utils/redis.js";
import { errorResponse } from "../utils/responses.js";

interface RateLimiterOptions {
  windowSeconds: number;
  maxRequests: number;
}

export const rateLimiter = ({
  windowSeconds,
  maxRequests,
}: RateLimiterOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ip = req.ip;
      const key = `rate-limit:${ip}`;

      const current = await redis.incr(key);

      if (current === 1) {
        await redis.expire(key, windowSeconds);
      }

      if (current > maxRequests) {
        return errorResponse(
          res,
          "Too many requests. Limit is ${maxRequests} per ${windowSeconds} seconds.",
          "Too many requests. Limit is ${maxRequests} per ${windowSeconds} seconds.",
          429,
        );
      }

      next();
    } catch (err) {
      console.error("Rate limiter error:", err);
      next();
    }
  };
};
