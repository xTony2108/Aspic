import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Root } from "./components/root";
import { Home } from "./pages/Home";
import { ConsulenzaPsicologica } from "./pages/ConsulenzaPsicologica";
import { ValutazionePsicodiagnostica } from "./pages/ValutazionePsicodiagnostica";

const rootRoute = createRootRoute({
  component: Root,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const consulenzaPsicologicaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/consulenza-psicologica",
  component: ConsulenzaPsicologica,
});

const valutazionePsicodiagnosticaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/valutazione-psicodiagnostica",
  component: ValutazionePsicodiagnostica,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  consulenzaPsicologicaRoute,
  valutazionePsicodiagnosticaRoute,
]);
