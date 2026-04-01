import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { ApiError, GenericResponse } from "../../types/api";
import { axiosPrivate } from "../axios";
import type { ChangePasswordTypeSchema } from "../../features/services/schemas/schemas";

const changePassword = (data: ChangePasswordTypeSchema) =>
  axiosPrivate.post("/admin/password", data).then((r) => r.data);

export const createChangePasswordMutationOptions = <
  TError = ApiError<GenericResponse>,
>(
  options?: Omit<
    UseMutationOptions<GenericResponse, TError, ChangePasswordTypeSchema>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["changePassword"],
    mutationFn: (data: ChangePasswordTypeSchema) => changePassword(data),
  });
};
