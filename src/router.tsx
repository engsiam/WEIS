import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MotionTestPage } from "./pages/MotionTestPage";

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const motionTestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/motiontest",
  component: MotionTestPage,
});

const routeTree = rootRoute.addChildren([indexRoute, motionTestRoute]);

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
