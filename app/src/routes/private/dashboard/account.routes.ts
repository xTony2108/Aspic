import { createLazyRoute } from "@tanstack/react-router";
import { DashboardAccount } from "../../../pages/private/Dashboard/DashboardAccount";

export const Route = createLazyRoute("/_autenticato/dashboard/impostazioni")({
  component: DashboardAccount,
});
