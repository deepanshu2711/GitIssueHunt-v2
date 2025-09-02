import api from "@web/lib/api";

export const getIssues = async (page?: number, lang?: string, label?: string) =>
  (await api.get(`/issues?page=${page}&lang=${lang}&label=${label}`)).data.data;
