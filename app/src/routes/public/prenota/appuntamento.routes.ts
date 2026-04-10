import { createLazyRoute } from "@tanstack/react-router";
import { Appuntamento } from "../../../pages/public/prenota/Appuntamento";

export const Route = createLazyRoute("/prenota/appuntamento")({
  component: Appuntamento,
});
