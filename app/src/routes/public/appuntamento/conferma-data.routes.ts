import { createLazyRoute } from "@tanstack/react-router";
import { ConfermaCambioData } from "../../../pages/public/appuntamento/ConfermaCambioData";

export const Route = createLazyRoute("/appuntamento/conferma-data")({
  component: ConfermaCambioData,
});
