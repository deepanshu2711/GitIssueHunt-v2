import axios from "axios";

export const getIssues = async (query: string, page: string) => {
  const response = await axios.get(
    `https://api.github.com/search/issues?q=${query}&page=${page}`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_SECRET}`,
        Accept: "application/vnd.github+json",
      },
    },
  );
  return response.data;
};
