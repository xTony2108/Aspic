import { axiosPrivate } from "../../axios";
import type { ApiError, GenericResponse } from "../../../types/api";
import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";

const createSlot = (data: Record<string, string>): Promise<GenericResponse> =>
  axiosPrivate.post("/admin/slots", { data }).then((r) => r.data);

export const createSlotMutationOptions = <TError = ApiError<GenericResponse>>(
  options?: Omit<
    UseMutationOptions<GenericResponse, TError, Record<string, string>>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["createSlot"],
    mutationFn: createSlot,
  });
};
