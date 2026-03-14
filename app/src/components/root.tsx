import { Outlet } from "@tanstack/react-router";

export const Root = () => {
  return (
    <>
      <main className="relative pt-18 ">
        <Outlet />
      </main>
    </>
  );
};
