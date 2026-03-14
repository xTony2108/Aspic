import { createRootRoute, createRoute, redirect } from "@tanstack/react-router";
import { Root } from "./components/root";
import { Home } from "./pages/Home";
import { Servizio } from "./pages/Servizio";
import { NotFound } from "./pages/NotFound";
import { FormStepLayout } from "./pages/FormStepLayout";
import { Appuntamento } from "./pages/Appuntamento";
import { DatiPersonali } from "./pages/DatiPersonali";
import { Riepilogo } from "./pages/Riepilogo";
import { Successo } from "./pages/Successo";

const rootRoute = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const prenotaRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "prenota",
  beforeLoad: ({ location }) => {
    if (location.pathname === "/prenota")
      throw redirect({ to: "/prenota/servizio" });
  },
  component: FormStepLayout,
});

export const servizioRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "servizio",
  component: Servizio,
});

export const appuntamentoRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "appuntamento",
  component: Appuntamento,
});

export const datiPersonaliRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "dati",
  component: DatiPersonali,
});

export const riepilogoRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "riepilogo",
  component: Riepilogo,
});

export const successoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "prenota/successo",
  component: Successo,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  prenotaRedirectRoute.addChildren([
    servizioRoute,
    appuntamentoRoute,
    datiPersonaliRoute,
    riepilogoRoute,
  ]),
  successoRoute,
]);
