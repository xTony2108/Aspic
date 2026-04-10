import { createLazyRoute } from "@tanstack/react-router";
import { Servizio } from "../../../pages/public/prenota/Servizio";

export const Route = createLazyRoute("/prenota/servizio")({
  component: Servizio,
});
