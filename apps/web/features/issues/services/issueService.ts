import api from "@web/lib/api";

const getIssues = async (page?: number, lang?: string, label?: string) =>
  (await api.get(`/issues?page=${page}&lang=${lang}&label=${label}`)).data.data;

const getIssueDetails = async (
  owner: string,
  repo: string,
  issueId: string,
) => {
  const res = await api.get(
    `/issues/details?owner=${owner}&repo=${repo}&issueNumber=${issueId}`,
  );
  console.log("➡️ Fetching issue from backend:");
  return res.data;
};

export default {
  getIssues,
  getIssueDetails,
};
