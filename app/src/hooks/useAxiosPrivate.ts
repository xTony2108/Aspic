import { useLayoutEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useAuthStore } from "../store";
import { useRefreshToken } from "./useRefreshToken";
import { type AxiosError } from "axios";
import "axios";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    sent?: boolean;
  }
}

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const accessToken = useAuthStore((s) => s.accessToken);

  useLayoutEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error.config;

        if (!prevRequest) return Promise.reject(error);

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          const newAccessToken = await refresh();
          useAuthStore.setState(newAccessToken);

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [refresh, accessToken]);

  return axiosPrivate;
};
