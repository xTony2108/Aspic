import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import type { ApiError, GenericResponse } from "../../types/api";

export const rejectDateChange = (token: string): Promise<GenericResponse> =>
  axiosPublic
    .post("/appointments/change-date/reject", { token })
    .then((r) => r.data);

export const createRejectDateChangeMutationOptions = <
  TError = ApiError<GenericResponse>,
>(
  token: string,
  options?: Omit<
    UseMutationOptions<GenericResponse, TError, void>,
    "mutationKey" | "mutationFn"
  >,
) =>
  mutationOptions({
    ...options,
    mutationKey: ["reject-date-change", token],
    mutationFn: () => rejectDateChange(token),
  });
