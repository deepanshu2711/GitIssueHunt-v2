import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5081/api/v1",
  withCredentials: true,
});

export default api;
