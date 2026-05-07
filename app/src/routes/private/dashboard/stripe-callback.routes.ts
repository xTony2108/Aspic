import { createLazyRoute } from "@tanstack/react-router";
import { StripeCallbackPage } from "../../../pages/private/Dashboard/StripeCallbackPage";

export const Route = createLazyRoute("/_autenticato/dashboard/stripe-callback")(
  {
    component: StripeCallbackPage,
  },
);
