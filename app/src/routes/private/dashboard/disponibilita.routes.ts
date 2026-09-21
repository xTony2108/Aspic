import { createLazyRoute } from "@tanstack/react-router";
import { DashboardDisponibilita } from "../../../pages/private/Dashboard/DashboardDisponibilita";

export const Route = createLazyRoute("/_autenticato/dashboard/disponibilita")({
  component: DashboardDisponibilita,
});
