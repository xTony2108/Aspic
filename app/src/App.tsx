import { createRouter, RouterProvider } from "@tanstack/react-router";
import { queryClient } from "./queryClient";
import { routeTree } from "./routes";

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: "intent",
  context: { queryClient },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
