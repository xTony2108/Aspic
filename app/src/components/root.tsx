import { Outlet } from "@tanstack/react-router";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";

export const Root = () => {
  return (
    <>
      <Header />
      <main className="relative pt-20.25 lg:pt-[94.61px] ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
