import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { type ApiError, type GenericResponse } from "../../types/api";
import { axiosPrivate } from "../axios";

const deleteSession = (data: { jti: string }) =>
  axiosPrivate.delete("/admin/sessions", { data }).then((r) => r.data);

export const createDeleteSessionMutationOptions = <
  TError = ApiError<GenericResponse>,
>(
  options?: Omit<
    UseMutationOptions<GenericResponse, TError, { jti: string }>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["deleteSession"],
    mutationFn: deleteSession,
  });
};
