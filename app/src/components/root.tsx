import { Outlet } from "@tanstack/react-router";
import { Header } from "./layout/Header";

export const Root = () => {
  return (
    <div className="min-h-dvh">
      <Header />
      <Outlet />
    </div>
  );
};
