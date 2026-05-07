import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import { axiosPrivate } from "../axios";
import {
  type ApiError,
  type StripeOnboardingDataResponse,
} from "../../types/api";

const getStripeOnboardingDataFn = (): Promise<StripeOnboardingDataResponse> =>
  axiosPrivate.get("/stripe/onboarding").then((r) => r.data);

export const createGetStripeOnboardingDataQueryOptions = <
  TError = ApiError<StripeOnboardingDataResponse>,
>(
  options?: Omit<
    UseQueryOptions<
      StripeOnboardingDataResponse,
      TError,
      StripeOnboardingDataResponse
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return queryOptions({
    ...options,
    queryKey: ["stripeOnboardingData"],
    queryFn: getStripeOnboardingDataFn,
  });
};
