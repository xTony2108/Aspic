import { axiosPrivate } from "./axios";
import { useAuthStore } from "../store";
import axios from "axios";

axiosPrivate.interceptors.request.use((config) => {
  if (!config.headers["Authorization"]) {
    const { accessToken } = useAuthStore.getState();
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (!prevRequest || prevRequest.sent) return Promise.reject(error);

    if (error?.response?.status === 401) {
      prevRequest.sent = true;
      try {
        const response = await axios.get("/api/auth/refresh", {
          withCredentials: true,
        });
        const newToken = response.data.accessToken;
        useAuthStore.getState().setData({ accessToken: newToken });
        prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosPrivate(prevRequest);
      } catch {
        useAuthStore.getState().clearData();
      }
    }

    return Promise.reject(error);
  },
);
