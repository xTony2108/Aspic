import { createLazyRoute } from "@tanstack/react-router";
import { DashboardProfessionisti } from "../../../pages/private/Dashboard/DashboardProfessionisti";

export const Route = createLazyRoute("/_autenticato/dashboard/professionisti")({
  component: DashboardProfessionisti,
});
