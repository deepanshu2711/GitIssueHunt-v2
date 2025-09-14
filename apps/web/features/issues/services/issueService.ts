import api from "@web/lib/api";
import { IsSavedIssue, SaveUserIssue } from "../types";

const getIssues = async (page?: number, lang?: string, label?: string) =>
  (await api.get(`/issues?page=${page}&lang=${lang}&label=${label}`)).data.data;

const getIssueDetails = async (
  owner: string,
  repo: string,
  issueId: string,
) => {
  const { data } = await api.get(
    `/issues/details?owner=${owner}&repo=${repo}&issueNumber=${issueId}`,
  );
  return data;
};

const saveUserIssue = async (payload: SaveUserIssue) => {
  const { data } = await api.post(`/issues/save`, payload);
  return data;
};

const isSavedIssue = async (payload: IsSavedIssue) => {
  console.log("payload issavedissue", payload);
  const { data } = await api.get(
    `/issues/saved/check?userId=${payload.userId}&url=${payload.url}`,
  );
  return data.data.saved;
};

export default {
  getIssues,
  getIssueDetails,
  saveUserIssue,
  isSavedIssue,
};
