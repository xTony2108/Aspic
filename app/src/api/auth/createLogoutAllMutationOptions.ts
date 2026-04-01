import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { type ApiError, type GenericResponse } from "../../types/api";
import { axiosPrivate } from "../axios";

const logoutAll = () =>
  axiosPrivate.post("/auth/logout-all").then((r) => r.data);

export const createLogoutAllMutationOptions = <
  TError = ApiError<GenericResponse>,
>(
  options?: Omit<
    UseMutationOptions<GenericResponse, TError>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["logout-all"],
    mutationFn: logoutAll,
  });
};
