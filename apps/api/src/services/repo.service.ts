import axios from "axios";

export const getRepo = async (page: string) => {
  console.log("page", page);
  const response = await axios.get(
    `https://api.github.com/search/repositories?q=stars:>1&page=${page}`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_SECRET}`,
        Accept: "application/vnd.github+json",
      },
    },
  );
  return response.data;
};
