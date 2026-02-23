import { createRootRoute, createRoute, redirect } from "@tanstack/react-router";
import { Root } from "./components/root";
import { Home } from "./pages/Home";
import { FormDatiRichiesta } from "./pages/FormDatiRichiesta";
import { FormDatiPersonali } from "./pages/FormDatiPersonali";
import { Riepilogo } from "./pages/Riepilogo";
import { LayoutServizio } from "./pages/LayoutServizio";
import { validServices } from "./costants/validServices";
import { FormStepLayout } from "./pages/FormStepLayout";
import { NotFound } from "./pages/NotFound";

const rootRoute = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

export const serviziRootRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "servizi",
  beforeLoad: async () => {
    throw redirect({ to: "/" });
  },
});

export const servizioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "servizi/$servizio",
  beforeLoad: async ({ params }) => {
    const service = params.servizio;

    if (validServices && !validServices.includes(service)) {
      throw redirect({ to: "/" });
    }

    return { service };
  },
});

const servizioIndexRoute = createRoute({
  getParentRoute: () => servizioRoute,
  path: "/",
  component: LayoutServizio,
});

const formLayoutRoute = createRoute({
  getParentRoute: () => servizioRoute,
  path: "form",
  beforeLoad: ({ location }) => {
    if (location.pathname.endsWith("/form")) {
      throw redirect({ to: ".." });
    }
  },
  component: FormStepLayout,
});

const formDatiRichiestaRoute = createRoute({
  getParentRoute: () => formLayoutRoute,
  path: "dati-richiesta",
  component: FormDatiRichiesta,
});

const formDatiPersonaliRoute = createRoute({
  getParentRoute: () => formLayoutRoute,
  path: "dati-personali",
  component: FormDatiPersonali,
});

const formRiepilogoRoute = createRoute({
  getParentRoute: () => servizioRoute,
  path: "form/riepilogo",
  component: Riepilogo,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  serviziRootRedirectRoute,
  servizioRoute,
  servizioIndexRoute,
  formLayoutRoute,
  formDatiRichiestaRoute,
  formDatiPersonaliRoute,
  formRiepilogoRoute,
]);
