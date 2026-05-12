import { createLazyRoute } from "@tanstack/react-router";
import { RifiutaCambioData } from "../../../pages/public/appuntamento/RifiutaCambioData";

export const Route = createLazyRoute("/appuntamento/rifiuta-data")({
  component: RifiutaCambioData,
});
