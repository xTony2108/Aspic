import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import type { ApiError, GenericResponse } from "../../types/api";

const verifyToken = (token: string): Promise<GenericResponse> =>
  axiosPublic.post(`/auth/verify`, { token }).then((r) => r.data);

export const createEmailVerificationMutationOptions = <
  TError = ApiError<GenericResponse>,
>(
  token: string,
  options?: Omit<
    UseMutationOptions<GenericResponse, TError, void>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["verify", token],
    mutationFn: () => verifyToken(token),
  });
};
