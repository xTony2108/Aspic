import { createLazyRoute } from "@tanstack/react-router";
import { DashboardForbidden } from "../../../pages/private/Dashboard/DashboardForbidden";

export const Route = createLazyRoute("/_autenticato/dashboard/non-autorizzato")(
  {
    component: DashboardForbidden,
  },
);
