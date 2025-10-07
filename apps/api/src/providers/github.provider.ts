import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `token ${process.env.GITHUB_SECRET}`,
  },
});

githubApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("GitHub API Error:", error.response?.data || error.message);
    throw error;
  },
);

export default githubApi;
