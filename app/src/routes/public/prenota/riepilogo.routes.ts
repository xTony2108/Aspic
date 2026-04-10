import { createLazyRoute } from "@tanstack/react-router";
import { Riepilogo } from "../../../pages/public/prenota/Riepilogo";

export const Route = createLazyRoute("/prenota/riepilogo")({
  component: Riepilogo,
});
