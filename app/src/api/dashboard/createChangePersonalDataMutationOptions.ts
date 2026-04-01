import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { ApiError, GenericResponse } from "../../types/api";
import { axiosPrivate } from "../axios";
import type { ChangePersonalDataTypeSchema } from "../../features/services/schemas/schemas";

const changePersonalData = (data: ChangePersonalDataTypeSchema) =>
  axiosPrivate.post("/admin/personal", data).then((r) => r.data);

export const createChangePersonalDataMutationOptions = <
  TError = ApiError<GenericResponse>,
>(
  options?: Omit<
    UseMutationOptions<GenericResponse, TError, ChangePersonalDataTypeSchema>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["changePersonalData"],
    mutationFn: (data: ChangePersonalDataTypeSchema) =>
      changePersonalData(data),
  });
};
