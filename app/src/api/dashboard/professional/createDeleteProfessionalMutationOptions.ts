import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { axiosPrivate } from "../../axios";
import { type ApiError, type GenericResponse } from "../../../types/api";

const deleteProfessional = (userId: string): Promise<GenericResponse> =>
  axiosPrivate.delete(`/admin/professionals/${userId}`).then((r) => r.data);

export const createDeleteProfessionalMutationOptions = <
  TError = ApiError<GenericResponse>,
>(
  options?: Omit<
    UseMutationOptions<GenericResponse, TError, string>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["deleteProfessional"],
    mutationFn: (userId: string) => deleteProfessional(userId),
  });
};
