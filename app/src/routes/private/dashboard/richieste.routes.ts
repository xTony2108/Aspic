import { createLazyRoute } from "@tanstack/react-router";
import { DashboardRichieste } from "../../../pages/private/Dashboard/DashboardRichieste";

export const Route = createLazyRoute("/_autenticato/dashboard/richieste")({
  component: DashboardRichieste,
});
