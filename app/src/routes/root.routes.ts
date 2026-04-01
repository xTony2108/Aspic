import { createRootRouteWithContext } from "@tanstack/react-router";
import { NotFound } from "../pages/public/NotFound";
import { Root } from "../pages/root";
import type { QueryClient } from "@tanstack/react-query";
import { ErrorComponent } from "../components/ErrorComponent";

interface RouterContext {
  queryClient: QueryClient;
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
});
