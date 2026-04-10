import { createLazyRoute } from "@tanstack/react-router";
import { Successo } from "../../../pages/public/prenota/Successo";

export const Route = createLazyRoute("/prenota/successo")({
  component: Successo,
});
