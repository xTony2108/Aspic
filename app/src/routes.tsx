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
import { AdminLogin } from "./pages/AdminLogin";
import { AdminVerifica } from "./pages/AdminVerifica";
import { Dashboard } from "./pages/Dashboard";
import { PersistLogin } from "./components/PersistLogin";

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

const servizioRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "servizio",
  component: Servizio,
});

const appuntamentoRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "appuntamento",
  component: Appuntamento,
});

const datiPersonaliRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "dati",
  component: DatiPersonali,
});

const riepilogoRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "riepilogo",
  component: Riepilogo,
});

const successoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "prenota/successo",
  component: Successo,
});

const adminAutenticatoRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_autenticato",
  component: PersistLogin,
});

const adminRoute = createRoute({
  getParentRoute: () => adminAutenticatoRoute,
  path: "admin",
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/",
  component: AdminLogin,
});

const adminVerificaRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "verifica",
  component: AdminVerifica,
});

const dashboardRoute = createRoute({
  getParentRoute: () => adminAutenticatoRoute,
  path: "dashboard",
  component: Dashboard,
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
  adminAutenticatoRoute.addChildren([
    adminRoute.addChildren([adminIndexRoute, adminVerificaRoute]),
    dashboardRoute,
  ]),
]);
