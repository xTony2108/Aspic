import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "../../../components/dashboard/Sidebar";

export const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
};
