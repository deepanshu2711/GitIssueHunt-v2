import type { Request, Response } from "express";
import { asyncHandler, successResponse } from "../utils/responses.js";
import { withRedisCache } from "../utils/withRedisCache.js";
import * as RepoService from "../services/repo.service.js";

export const getRepo = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1 } = req.query;
  const cacheKey = `reps:${page}`;
  const repos = await withRedisCache(
    cacheKey,
    () => RepoService.getRepo(page as string),
    {
      ttlSeconds: 600,
    },
  );
  return successResponse(res, repos, "repos fetched succesfully");
});
