import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import type { ApiError, GenericResponse } from "../../types/api";
import type { ActivateAccountTypeSchema } from "../../features/services/schemas/schemas";

const verifyToken = (
  token: string,
  data: ActivateAccountTypeSchema,
): Promise<GenericResponse> =>
  axiosPublic.post("/auth/verify", { token, ...data }).then((r) => r.data);

export const createEmailVerificationMutationOptions = <
  TError = ApiError<GenericResponse>,
>(
  token: string,
  options?: Omit<
    UseMutationOptions<GenericResponse, TError, ActivateAccountTypeSchema>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["verify", token],
    mutationFn: (data) => verifyToken(token, data),
  });
};
