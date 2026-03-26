import {
  createRootRoute,
  createRoute,
  isRedirect,
  redirect,
} from "@tanstack/react-router";
import { Root } from "./components/root";
import { NotFound } from "./pages/NotFound";
import { useAuthStore } from "./store";
import axios, { isAxiosError } from "axios";
import { Loading } from "./components/Loading";
import { queryClient } from "./main";
import { createGetUserDataQueryOptions } from "./api/admin/getUserData";

const rootRoute = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
}).lazy(() => import("./pages/Home").then((d) => d.Route));

const prenotaRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "prenota",
  beforeLoad: ({ location }) => {
    if (location.pathname.endsWith("/prenota"))
      throw redirect({ to: "/prenota/servizio" });
  },
}).lazy(() => import("./pages/FormStepLayout").then((d) => d.Route));

const servizioRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "servizio",
}).lazy(() => import("./pages/Servizio").then((d) => d.Route));

const appuntamentoRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "appuntamento",
}).lazy(() => import("./pages/Appuntamento").then((d) => d.Route));

const datiPersonaliRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "dati",
}).lazy(() => import("./pages/DatiPersonali").then((d) => d.Route));

const riepilogoRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "riepilogo",
}).lazy(() => import("./pages/Riepilogo").then((d) => d.Route));

const successoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "prenota/successo",
}).lazy(() => import("./pages/Successo").then((d) => d.Route));

const adminAutenticatoRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_autenticato",
  beforeLoad: async ({ location }) => {
    const { accessToken } = useAuthStore.getState();
    const pathname = location.pathname;

    if (accessToken) return;

    try {
      const response = await axios.get("/api/auth/refresh", {
        withCredentials: true,
      });

      const newToken = response.data.accessToken;
      useAuthStore.getState().setData({ accessToken: newToken });
      console.log(newToken);

      if (newToken && pathname.startsWith("/admin")) {
        throw redirect({ to: "/dashboard" });
      }
    } catch (error) {
      if (isRedirect(error)) throw error;

      if (
        isAxiosError(error) &&
        error.status === 401 &&
        !pathname.startsWith("/admin")
      ) {
        throw redirect({ to: "/admin" });
      }
    }
  },
  pendingComponent: Loading,
  pendingMs: 300,
  pendingMinMs: 800,
  loader: async ({ location }) => {
    const { userData } = await queryClient.ensureQueryData(
      createGetUserDataQueryOptions(),
    );
    if (
      !userData.passwordChanged &&
      location.pathname != "/dashboard/impostazioni"
    )
      throw redirect({
        to: "/dashboard/impostazioni",
      });
    return { userData };
  },
});

const adminRoute = createRoute({
  getParentRoute: () => adminAutenticatoRoute,
  path: "admin",
  notFoundComponent: NotFound,
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/",
}).lazy(() => import("./pages/Dashboard/AdminLogin").then((d) => d.Route));

const adminVerificaRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "verifica",
}).lazy(() => import("./pages/Dashboard/AdminVerifica").then((d) => d.Route));

const dashboardLayoutRoute = createRoute({
  getParentRoute: () => adminAutenticatoRoute,
  path: "dashboard",
  beforeLoad: ({ location }) => {
    if (location.pathname.endsWith("/dashboard"))
      throw redirect({ to: "/dashboard/richieste" });
  },
}).lazy(() => import("./pages/Dashboard/Dashboard").then((d) => d.Route));

const dashboardRichiesteRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "richieste",
}).lazy(() =>
  import("./pages/Dashboard/DashboardRichieste").then((d) => d.Route),
);

const dashboardDisponibilitaRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "disponibilita",
});

const dashboardProfessionistiRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "professionisti",
});

const dashboardImpostazioniRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "impostazioni",
}).lazy(() =>
  import("./pages/Dashboard/DashboardAccount").then((d) => d.Route),
);

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
    dashboardLayoutRoute.addChildren([
      dashboardRichiesteRoute,
      dashboardDisponibilitaRoute,
      dashboardProfessionistiRoute,
      dashboardImpostazioniRoute,
    ]),
  ]),
]);
