import { createRoute, isRedirect, redirect } from "@tanstack/react-router";
import { rootRoute } from "../routes/root.routes";
import { useAuthStore } from "../store";
import axios, { isAxiosError } from "axios";
import { Loading } from "../components/Loading";
import { NotFound } from "../pages/public/NotFound";
import { createGetUserDataQueryOptions } from "../api/admin/createGetUserDataQueryOptions";
import { createGetUsersQueryOptions } from "../api/dashboard/professional/createGetUsersQueryOptions";
import { createActiveSessionsQueryOptions } from "../api/dashboard/sessions/createActiveSessionsQueryOptions";
import { stripeSearchSchema } from "../features/services/schemas/schemas";

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

const confermaCambioDataRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "appuntamento/conferma-data",
}).lazy(() =>
  import("./public/appuntamento/conferma-data.routes").then((d) => d.Route),
);

const rifiutaCambioDataRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "appuntamento/rifiuta-data",
}).lazy(() =>
  import("./public/appuntamento/rifiuta-data.routes").then((d) => d.Route),
);

// AUTENTICATO

const adminAutenticatoRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_autenticato",
  beforeLoad: async ({ location }) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) return;

    const isAdminRoot = /^\/admin\/?$/.test(location.pathname);
    const isAdminArea = /^\/admin(\/|$)/.test(location.pathname);
    try {
      const response = await axios.get("/api/auth/refresh", {
        withCredentials: true,
      });
      useAuthStore
        .getState()
        .setData({ accessToken: response.data.accessToken });

      if (isAdminRoot || isAdminArea) {
        throw redirect({ to: "/dashboard/richieste" });
      }
    } catch (error) {
      if (isRedirect(error)) throw error;
      if (isAxiosError(error)) {
        if (error.status === 401 && !isAdminRoot) {
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
  beforeLoad: async ({ location }) => {
    if (
      location.pathname.endsWith("/dashboard") ||
      location.pathname.endsWith("/dashboard/")
    ) {
      throw redirect({ to: "/dashboard/richieste" });
    }
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(
      createGetUserDataQueryOptions({ staleTime: Infinity }),
    );
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
}).lazy(() =>
  import("./private/dashboard/disponibilita.routes").then((d) => d.Route),
);

const dashboardProfessionistiRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "professionisti",
  loader: async ({ context: { queryClient } }) => {
    try {
      await queryClient.ensureQueryData(createGetUsersQueryOptions());
    } catch (error) {
      const isAdminRoot = /^\/admin\/?$/.test(location.pathname);

      if (isAxiosError(error) && error.status === 403 && !isAdminRoot) {
        throw redirect({ to: "/dashboard/non-autorizzato" });
      }
    }
  },
}).lazy(() =>
  import("./private/dashboard/professionisti.routes").then((d) => d.Route),
);

const dashboardImpostazioniRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "impostazioni",
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(createActiveSessionsQueryOptions());
  },
}).lazy(() =>
  import("./private/dashboard/account.routes").then((d) => d.Route),
);

const dashboardStripeCallbackRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "stripe-callback",
  validateSearch: stripeSearchSchema,
}).lazy(() =>
  import("./private/dashboard/stripe-callback.routes").then((d) => d.Route),
);

const dashboardForbiddenRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "non-autorizzato",
}).lazy(() =>
  import("./private/dashboard/non-autorizzato.routes").then((d) => d.Route),
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
  confermaCambioDataRoute,
  rifiutaCambioDataRoute,
  adminAutenticatoRoute.addChildren([
    adminRoute.addChildren([adminIndexRoute, adminVerificaRoute]),
    dashboardLayoutRoute.addChildren([
      dashboardRichiesteRoute,
      dashboardDisponibilitaRoute,
      dashboardProfessionistiRoute,
      dashboardImpostazioniRoute,
      dashboardStripeCallbackRoute,
      dashboardForbiddenRoute,
    ]),
  ]),
]);
