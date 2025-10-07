import type { GetRepoDetailsInputType } from "../schemas/repo.schema.js";
import githubApi from "../providers/github.provider.js";

export const getRepo = async (page: string) => {
  const { data } = await githubApi.get(
    `/search/repositories?q=stars:>1&page=${page}`,
  );
  return data;
};

export const getRepoDetails = async ({
  owner,
  repo,
}: GetRepoDetailsInputType) => {
  const { data } = await githubApi.get(`/repos/${owner}/${repo}`);
  return data;
};
