import { createLazyRoute } from "@tanstack/react-router";
import { AdminVerificaEmail } from "../../../pages/public/admin/AdminVerificaEmail";

export const Route = createLazyRoute("/_autenticato/admin/verifica")({
  component: AdminVerificaEmail,
});
