import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { ApiError, GenericResponse } from "../../../types/api";
import { axiosPrivate } from "../../axios";
import type { RegisterProfessionalTypeSchema } from "../../../features/services/schemas/schemas";

const createNewprofessional = (
  data: RegisterProfessionalTypeSchema,
): Promise<GenericResponse> =>
  axiosPrivate.post("/admin/register", data).then((r) => r.data);

export const createNewprofessionalMutationOptions = <
  TError = ApiError<GenericResponse>,
>(
  options?: Omit<
    UseMutationOptions<GenericResponse, TError, RegisterProfessionalTypeSchema>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["newprofessional"],
    mutationFn: (data: RegisterProfessionalTypeSchema) =>
      createNewprofessional(data),
  });
};
