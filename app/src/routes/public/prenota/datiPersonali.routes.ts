import { createLazyRoute } from "@tanstack/react-router";
import { DatiPersonali } from "../../../pages/public/prenota/DatiPersonali";

export const Route = createLazyRoute("/prenota/dati")({
  component: DatiPersonali,
});
