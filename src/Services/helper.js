import axios from "axios";
import { getToken } from "../Auth";

export const BASE_URL = "http://localhost:8081";

export const myaxios = axios.create({
  baseURL: BASE_URL,
});
export const pvtAxios = axios.create({
  baseURL: BASE_URL,
});
pvtAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    // console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  },
  (error) => Promise.reject(error)
);
