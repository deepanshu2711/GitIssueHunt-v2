import api from "@web/lib/api";

const getRepos = async (page: number) => {
  const response = await api.get(`/repo?page=${page}`);
  return response.data.data;
};

export default {
  getRepos,
};
