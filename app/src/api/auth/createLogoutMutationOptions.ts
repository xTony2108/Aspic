import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { type ApiError, type GenericResponse } from "../../types/api";
import { axiosPrivate } from "../axios";

const logout = () => axiosPrivate.post("/auth/logout").then((r) => r.data);

export const createLogoutMutationOptions = <TError = ApiError<GenericResponse>>(
  options?: Omit<
    UseMutationOptions<GenericResponse, TError>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["logout"],
    mutationFn: logout,
  });
};
