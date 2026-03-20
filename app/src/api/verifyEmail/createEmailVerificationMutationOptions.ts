import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import type { ApiError, VerifyTokenResponse } from "../../types/api";

const verifyToken = (token: string) =>
  axiosPublic.post(`/auth/verify`, { token }).then((r) => r.data);

export const createEmailVerificationMutationOptions = <
  TError = ApiError<VerifyTokenResponse>,
>(
  token: string,
  options?: Omit<
    UseMutationOptions<VerifyTokenResponse, TError, void>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["verify", token],
    mutationFn: () => verifyToken(token),
  });
};
