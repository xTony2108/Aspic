import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import { axiosPrivate } from "../axios";
import { type ApiError, type UserDataResponse } from "../../types/api";

const getUserDataFn = (): Promise<UserDataResponse> =>
  axiosPrivate.get("/admin/me").then((r) => r.data);

export const createGetUserDataQueryOptions = <
  TError = ApiError<UserDataResponse>,
>(
  options?: Omit<
    UseQueryOptions<UserDataResponse, TError, UserDataResponse>,
    "queryKey" | "queryFn"
  >,
) => {
  return queryOptions({
    ...options,
    queryKey: ["userData"],
    queryFn: getUserDataFn,
  });
};
