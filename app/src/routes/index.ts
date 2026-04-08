import { createRoute, isRedirect, redirect } from "@tanstack/react-router";
import { rootRoute } from "../routes/root.routes";
import { useAuthStore } from "../store";
import axios, { isAxiosError } from "axios";
import { Loading } from "../components/Loading";
import { NotFound } from "../pages/public/NotFound";
import { createGetUserDataQueryOptions } from "../api/admin/getUserData";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
}).lazy(() => import("./public/home.routes").then((d) => d.Route));

// Prenota

const prenotaRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "prenota",
  beforeLoad: ({ location }) => {
    if (location.pathname.endsWith("/prenota"))
      throw redirect({ to: "/prenota/servizio" });
  },
}).lazy(() => import("./public/prenota/prenota.routes").then((d) => d.Route));

const servizioRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "servizio",
}).lazy(() => import("./public/prenota/servizio.routes").then((d) => d.Route));

const appuntamentoRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "appuntamento",
}).lazy(() =>
  import("./public/prenota/appuntamento.routes").then((d) => d.Route),
);

const datiPersonaliRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "dati",
}).lazy(() =>
  import("./public/prenota/datiPersonali.routes").then((d) => d.Route),
);

const riepilogoRoute = createRoute({
  getParentRoute: () => prenotaRedirectRoute,
  path: "riepilogo",
}).lazy(() => import("./public/prenota/riepilogo.routes").then((d) => d.Route));

const successoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "prenota/successo",
  beforeLoad: ({ location }) => {
    if (!location.state?.success) {
      throw redirect({ to: "/prenota", replace: true });
    }
  },
}).lazy(() => import("./public/prenota/successo.routes").then((d) => d.Route));

// AUTENTICATO

const adminAutenticatoRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_autenticato",

  beforeLoad: async ({ location }) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) return;

    try {
      const response = await axios.get("/api/auth/refresh", {
        withCredentials: true,
      });
      useAuthStore
        .getState()
        .setData({ accessToken: response.data.accessToken });

      if (
        location.pathname.endsWith("/admin") ||
        location.pathname.endsWith("/admin/")
      ) {
        throw redirect({ to: "/dashboard" });
      }
    } catch (error) {
      if (isRedirect(error)) throw error;
      if (isAxiosError(error)) {
        if (error.status === 401 && !location.pathname.startsWith("/admin")) {
          throw redirect({ to: "/admin" });
        }

        if (!error.response) {
          throw new Response("Server offline", { status: 503 });
        }

        if (error.status === 500)
          throw new Error(error.response?.data?.message || "Server error");
      }
    }
  },
  pendingComponent: Loading,
  pendingMs: 300,
  pendingMinMs: 800,
});

// LOGIN

const adminRoute = createRoute({
  getParentRoute: () => adminAutenticatoRoute,
  path: "admin",
  notFoundComponent: NotFound,
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/",
}).lazy(() => import("./public/admin/admin.routes").then((d) => d.Route));

const adminVerificaRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "verifica",
}).lazy(() =>
  import("./public/admin/verificaEmail.routes").then((d) => d.Route),
);

// DASHBOARD

const dashboardLayoutRoute = createRoute({
  getParentRoute: () => adminAutenticatoRoute,
  path: "dashboard",
  pendingComponent: Loading,
  pendingMs: 300,
  pendingMinMs: 800,
  beforeLoad: ({ location }) => {
    if (location.pathname.endsWith("/dashboard"))
      throw redirect({ to: "/dashboard/richieste" });
  },
  loader: async ({ location, context: { queryClient } }) => {
    const { accessToken } = useAuthStore.getState();

    if (!accessToken || location.pathname.startsWith("/admin")) return null;

    try {
      const { userData } = await queryClient.ensureQueryData(
        createGetUserDataQueryOptions({ staleTime: Infinity }),
      );

      if (
        !userData.passwordChanged &&
        location.pathname !== "/dashboard/impostazioni"
      ) {
        throw redirect({ to: "/dashboard/impostazioni" });
      }

      return { userData };
    } catch (error) {
      if (isRedirect(error)) throw error;
      if (isAxiosError(error)) {
        if (error.status === 401) {
          throw redirect({ to: "/admin" });
        }
        if (error.status === 500)
          throw new Error(error.response?.data?.message || "Server error");
      }

      throw error;
    }
  },
}).lazy(() =>
  import("./private/dashboard/dashboard.routes").then((d) => d.Route),
);

const dashboardRichiesteRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "richieste",
}).lazy(() =>
  import("./private/dashboard/richieste.routes").then((d) => d.Route),
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
  import("./private/dashboard/account.routes").then((d) => d.Route),
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
