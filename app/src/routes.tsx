import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Root } from "./components/root";
import { Home } from "./pages/Home";

const rootRoute = createRootRoute({
  component: Root,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

export const routeTree = rootRoute.addChildren([indexRoute]);
