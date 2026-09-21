import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import { axiosPrivate } from "../../axios";
import type {
  ApiError,
  GenericResponse,
  SlotsResponse,
} from "../../../types/api";

const getSlots = (): Promise<GenericResponse & SlotsResponse> =>
  axiosPrivate.get("/admin/slots").then((r) => r.data);

export const createGetSlotsQueryOptions = <TError = ApiError<GenericResponse>>(
  options?: Omit<
    UseQueryOptions<SlotsResponse, TError, GenericResponse & SlotsResponse>,
    "queryKey" | "queryFn"
  >,
) => {
  return queryOptions({
    ...options,
    queryKey: ["slots"],
    queryFn: getSlots,
  });
};
