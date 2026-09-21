import { isAxiosError } from "axios";
import { isRedirect, redirect } from "@tanstack/react-router";

export const handleRouteError = (error: unknown, pathname: string) => {
  if (isRedirect(error)) throw error;

  if (isAxiosError(error)) {
    const isAdminRoot = /^\/admin\/?$/.test(pathname);

    if (!error.response) throw new Response("Server offline", { status: 503 });
    if (error.status === 401 && !isAdminRoot) throw redirect({ to: "/admin" });
    if (error.status === 403 && !isAdminRoot)
      throw isRedirect({ to: "/dashboard/non-autorizzato" });
    if (error.status === 500)
      throw new Error(error.response.data?.message ?? "Server error");
  }

  throw error;
};
