import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { axiosPrivate } from "../../axios";
import type { ApiError, GenericResponse } from "../../../types/api";

const deleteSession = (data: { jti: string }): Promise<GenericResponse> =>
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
