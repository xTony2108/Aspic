import { Outlet } from "@tanstack/react-router";
import { Header } from "./layout/Header";

export const Root = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};
