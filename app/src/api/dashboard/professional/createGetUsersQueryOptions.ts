import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import { axiosPrivate } from "../../axios";
import { type ApiError, type GetUsersResponse } from "../../../types/api";

const getUsers = (): Promise<GetUsersResponse> =>
  axiosPrivate.get("/admin/getUsers").then((r) => r.data);

export const createGetUsersQueryOptions = <TError = ApiError<GetUsersResponse>>(
  options?: Omit<
    UseQueryOptions<GetUsersResponse, TError, GetUsersResponse>,
    "queryKey" | "queryFn"
  >,
) => {
  return queryOptions({
    ...options,
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
