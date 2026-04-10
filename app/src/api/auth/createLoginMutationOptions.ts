import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { axiosPublic } from "../axios";
import type { LoginTypeSchema } from "../../features/services/schemas/schemas";
import {
  type ApiError,
  type LoginErrorResponse,
  type LoginResponse,
} from "../../types/api";

const login = (data: LoginTypeSchema): Promise<LoginResponse> =>
  axiosPublic.post("/auth/login", data).then((r) => r.data);

export const createLoginMutationOptions = <
  TError = ApiError<LoginErrorResponse>,
>(
  options?: Omit<
    UseMutationOptions<LoginResponse, TError, LoginTypeSchema>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["login"],
    mutationFn: (data: LoginTypeSchema) => login(data),
  });
};
