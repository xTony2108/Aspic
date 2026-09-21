import { axiosPrivate } from "../../axios";
import type { ApiError, GenericResponse } from "../../../types/api";
import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";

const deleteSlot = ({
  date,
  time,
}: {
  date: string;
  time: string;
}): Promise<GenericResponse> =>
  axiosPrivate.delete(`/admin/slots/${date}/${time}`).then((r) => r.data);

export const createDeleteSlotMutationOptions = <
  TError = ApiError<GenericResponse>,
>(
  options?: Omit<
    UseMutationOptions<GenericResponse, TError, { date: string; time: string }>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return mutationOptions({
    ...options,
    mutationKey: ["deleteSlot"],
    mutationFn: ({ date, time }) => deleteSlot({ date, time }),
  });
};
