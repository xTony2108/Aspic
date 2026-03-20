import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosPublic } from "../axios";

const resendToken = (token: string) =>
  axiosPublic.post(`/auth/verify/resend`, { token }).then((r) => r.data);

type VerifyTokenResponse = {
  message: string;
};

export const createResendMutationOptions = <
  TError = AxiosError<VerifyTokenResponse>,
>(
  token: string,
  options?: Omit<
    UseMutationOptions<VerifyTokenResponse, TError, void>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["resend", token],
    mutationFn: () => resendToken(token),
  });
};
