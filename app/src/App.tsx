import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routes";

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  context: { axiosPrivate: undefined! },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return <RouterProvider router={router} />;
};
