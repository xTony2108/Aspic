import {
  mutationOptions,
  type InfiniteData,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type {
  ApiError,
  AppointmentData,
  AppointmentResponse,
  GenericResponse,
} from "../../../types/api";
import { axiosPrivate } from "../../axios";
import { queryClient } from "../../../queryClient";
import { createAppointmentsUseInfiniteQueryOptions } from "./getAppointmentRequests";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

interface BodyRequest {
  _id: string;
  newDate: Date;
  newTime: string;
}

const patchAppointment = (data: BodyRequest): Promise<GenericResponse> =>
  axiosPrivate
    .patch(`/admin/appointments/change-date/${data._id}`, {
      newDate: data.newDate,
      newTime: data.newTime,
    })
    .then((r) => r.data);

export type Status =
  | "pending"
  | "awaiting_payment"
  | "date_change_pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export const createChangeDateMutationOptions = <
  TError = ApiError<GenericResponse>,
>(
  filter: Status,
  options?: Omit<
    UseMutationOptions<
      GenericResponse,
      TError,
      BodyRequest,
      { previousData: InfiniteData<AppointmentResponse, number> | undefined }
    >,
    | "mutationFn"
    | "mutationKey"
    | "onMutate"
    | "onError"
    | "onSettled"
    | "onSuccess"
  >,
) => {
  const appointmentInfiniteQueryKey = createAppointmentsUseInfiniteQueryOptions(
    10,
    filter,
  ).queryKey;
  return mutationOptions({
    ...options,
    mutationFn: (data: BodyRequest) => patchAppointment(data),
    mutationKey: ["change-date"],
    onMutate: async (data: BodyRequest) => {
      // CANCELLO EVENTUALI REFETCH
      await queryClient.cancelQueries({
        queryKey: appointmentInfiniteQueryKey,
      });

      // SALVO LO STATO DELLA CACHE PER ERRORE
      const previousData = queryClient.getQueryData<
        InfiniteData<AppointmentResponse, number>
      >(appointmentInfiniteQueryKey);

      // AGGIORNO LA CACHE RIMUOVENDO L'ID AGGIORNATO
      queryClient.setQueryData<InfiniteData<AppointmentResponse, number>>(
        appointmentInfiniteQueryKey,
        (oldData) => {
          if (!oldData) return;

          return {
            ...oldData,
            pages: oldData.pages.map((page: AppointmentResponse) => ({
              ...page,
              data: page.data.filter(
                (appointment: AppointmentData) => appointment._id !== data._id,
              ),
            })),
          };
        },
      );

      //RITORNO VECCHIO STATO
      return { previousData };
    },
    onError: (err, _data, context) => {
      // SE ERRORE ROLLBACK
      if (isAxiosError(err)) toast.error(err.response?.data.message);
      else toast.error(`Errore durante la modifica dell'orario`);

      queryClient.setQueryData(
        appointmentInfiniteQueryKey,
        context?.previousData,
      );
    },
    onSettled: () => {
      // SE OK INVALIDO QUERY
      queryClient.invalidateQueries({
        queryKey: appointmentInfiniteQueryKey,
      });
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data.message);
    },
  });
};
