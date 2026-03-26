import { createLazyRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { NotFoundDashboard } from "../NotFoundDashboard";

export const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export const Route = createLazyRoute("/_autenticato/dashboard")({
  component: Dashboard,
  notFoundComponent: NotFoundDashboard,
});
