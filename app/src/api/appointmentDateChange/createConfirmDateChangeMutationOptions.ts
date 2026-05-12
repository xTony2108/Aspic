import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import type { ApiError, GenericResponse } from "../../types/api";

export const confirmDateChange = (token: string): Promise<GenericResponse> =>
  axiosPublic
    .post("/appointments/change-date/confirm", { token })
    .then((r) => r.data);

export const createConfirmDateChangeMutationOptions = <
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
    mutationKey: ["confirm-date-change", token],
    mutationFn: () => confirmDateChange(token),
  });
