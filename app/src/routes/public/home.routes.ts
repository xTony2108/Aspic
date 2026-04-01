import { createLazyRoute } from "@tanstack/react-router";
import { Home } from "../../pages/public/Home";

export const Route = createLazyRoute("/")({
  component: Home,
});
