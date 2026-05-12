import {
  infiniteQueryOptions,
  keepPreviousData,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { axiosPrivate } from "../../axios";
import type {
  ApiError,
  AppointmentInfiniteQueryResponse,
  AppointmentResponse,
} from "../../../types/api";

const getAppointments = ({
  page,
  limit,
  filter,
}: {
  page: number;
  limit: number;
  filter:
    | "pending"
    | "awaiting_payment"
    | "date_change_pending"
    | "confirmed"
    | "cancelled"
    | "completed";
}): Promise<AppointmentResponse> => {
  const queryParams = new URLSearchParams();

  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());
  queryParams.append("filter", filter.toString());
  const queryString = queryParams.toString();

  return axiosPrivate
    .get(`/admin/appointments?${queryString ? queryString : ""}`)
    .then((r) => r.data);
};

export const createAppointmentsUseInfiniteQueryOptions = <
  TError = ApiError<AppointmentResponse>,
>(
  limit: number,
  filter:
    | "pending"
    | "awaiting_payment"
    | "date_change_pending"
    | "confirmed"
    | "cancelled"
    | "completed",
  options?: Omit<
    UseInfiniteQueryOptions<
      AppointmentResponse,
      TError,
      AppointmentInfiniteQueryResponse,
      string[],
      number
    >,
    | "queryKey"
    | "queryFn"
    | "getNextPageParam"
    | "initialPageParam"
    | "placeholderData"
  >,
) => {
  return infiniteQueryOptions({
    queryKey: ["getBookings", filter],
    queryFn: ({ pageParam = 1 }) =>
      getAppointments({ page: pageParam, limit, filter }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
    placeholderData: keepPreviousData,
    ...options,
  });
};
