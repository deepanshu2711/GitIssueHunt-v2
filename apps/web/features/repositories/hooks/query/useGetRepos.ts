import { useQuery } from "@tanstack/react-query";
import { RepoServices } from "../../services";
import { GitHubRepoResponse } from "../../types";

export const useGetRepos = (page: number) => {
  return useQuery<GitHubRepoResponse>({
    queryKey: ["repos", page],
    queryFn: () => RepoServices.getRepos(page),
    staleTime: 5000,
  });
};
