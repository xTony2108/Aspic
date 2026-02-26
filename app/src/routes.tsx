import { createRootRoute, createRoute, redirect } from "@tanstack/react-router";
import { Root } from "./components/root";
import { Home } from "./pages/Home";
import { Servizio } from "./pages/Servizio";
import { FormStepLayout } from "./pages/FormStepLayout";
import { NotFound } from "./pages/NotFound";
import {
  SERVIZI_CONFIG,
  validServiceIds,
  type ServiceId,
} from "./features/services/services.config";
import { Informazioni } from "./pages/Informazioni";
import { DatiPersonali } from "./pages/DatiPersonali";
import { Riepilogo } from "./pages/Riepilogo";

const rootRoute = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const serviziRootRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "servizi",
  beforeLoad: async () => {
    throw redirect({ to: "/" });
  },
});

export const servizioRouteLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "servizi/$servizio",
  beforeLoad: async ({ params }) => {
    const service = params.servizio as ServiceId;

    if (!validServiceIds.includes(service)) {
      throw redirect({ to: "/" });
    }

    return {
      config: SERVIZI_CONFIG[service],
    };
  },
  notFoundComponent: NotFound,
});

const servizioRoute = createRoute({
  getParentRoute: () => servizioRouteLayout,
  path: "/",
  component: Servizio,
});

const richiestaColloquioRouteLayout = createRoute({
  getParentRoute: () => servizioRouteLayout,
  path: "richiesta-colloquio",
  component: FormStepLayout,
  notFoundComponent: NotFound,
});

const richiestaColloquioIndexRoute = createRoute({
  getParentRoute: () => richiestaColloquioRouteLayout,
  path: "/",
  beforeLoad: async ({ params }) => {
    throw redirect({
      to: "..",
      params,
    });
  },
});

export const informazioniRoute = createRoute({
  getParentRoute: () => richiestaColloquioRouteLayout,
  path: "informazioni",
  component: Informazioni,
});

export const datiPersonaliRoute = createRoute({
  getParentRoute: () => richiestaColloquioRouteLayout,
  path: "dati-personali",
  component: DatiPersonali,
});

export const riepilogoRoute = createRoute({
  getParentRoute: () => richiestaColloquioRouteLayout,
  path: "riepilogo",
  component: Riepilogo,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  serviziRootRedirectRoute,
  servizioRouteLayout.addChildren([
    servizioRoute,
    richiestaColloquioRouteLayout.addChildren([
      richiestaColloquioIndexRoute,
      informazioniRoute,
      datiPersonaliRoute,
      riepilogoRoute,
    ]),
  ]),
]);
