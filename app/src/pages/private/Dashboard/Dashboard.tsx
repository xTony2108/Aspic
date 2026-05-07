import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { Sidebar } from "../../../components/dashboard/Sidebar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { router } from "../../../App";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createGetUserDataQueryOptions } from "../../../api/admin/createGetUserDataQueryOptions";

export const Dashboard = () => {
  const {
    data: { userData },
  } = useSuspenseQuery(createGetUserDataQueryOptions());
  const navigate = useNavigate();
  const location = useLocation();
  const isAlreadyOnSettings = location.pathname.includes(
    "/dashboard/impostazioni",
  );

  useEffect(() => {
    if (
      userData &&
      userData.passwordChanged === false &&
      !isAlreadyOnSettings
    ) {
      navigate({ to: "/dashboard/impostazioni", replace: true });
    }
  }, [userData, navigate, isAlreadyOnSettings]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <ReactQueryDevtools />
      <TanStackRouterDevtools router={router} />
    </>
  );
};
