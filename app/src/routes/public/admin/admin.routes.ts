import { createLazyRoute } from "@tanstack/react-router";
import { AdminLogin } from "../../../pages/public/admin/AdminLogin";

export const Route = createLazyRoute("/_autenticato/admin/")({
  component: AdminLogin,
});
