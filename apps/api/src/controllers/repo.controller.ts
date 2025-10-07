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

export const getRepoDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { owner, repo } = req.params;
    const cacheKey = `repo:${owner}:${repo}`;

    const data = await withRedisCache(cacheKey, () =>
      RepoService.getRepoDetails({ owner: owner!, repo: repo! }),
    );

    return successResponse(res, data, "Repo details fetched succesfully");
  },
);
