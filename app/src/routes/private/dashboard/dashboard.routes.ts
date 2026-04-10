import { createLazyRoute } from "@tanstack/react-router";
import { Dashboard } from "../../../pages/private/Dashboard/Dashboard";
import { NotFoundDashboard } from "../../../pages/private/Dashboard/NotFoundDashboard";

export const Route = createLazyRoute("/_autenticato/dashboard")({
  component: Dashboard,
  notFoundComponent: NotFoundDashboard,
});
