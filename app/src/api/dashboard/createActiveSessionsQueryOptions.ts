import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import { axiosPrivate } from "../axios";
import { type ActiveSessionsResponse, type ApiError } from "../../types/api";

const getActiveSessions = () =>
  axiosPrivate.get("/admin/sessions").then((r) => r.data);

export const createActiveSessionsQueryOptions = <
  TError = ApiError<ActiveSessionsResponse>,
>(
  options?: Omit<
    UseQueryOptions<ActiveSessionsResponse, TError, ActiveSessionsResponse>,
    "queryKey" | "queryFn"
  >,
) => {
  return queryOptions({
    ...options,
    queryKey: ["activeSessions"],
    queryFn: getActiveSessions,
  });
};
