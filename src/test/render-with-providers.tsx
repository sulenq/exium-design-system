// src/test/render-with-providers.tsx

import { ChakraSystemProvider } from "@/design-system/chakra/providers/chakra-system.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { act, render } from "@testing-library/react";
import type { RenderResult } from "@testing-library/react";
import type { ReactNode } from "react";

/**
 * Renders a component inside the providers it needs at runtime:
 * Chakra system, TanStack Query, and a memory-history TanStack Router
 * (required by NavLink and useNavigate).
 */
export const renderWithProviders = async (
  ui: ReactNode,
  options: { path?: string } = {},
) => {
  const { path = "/" } = options;

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  const rootRoute = createRootRoute();
  const pageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => <>{ui}</>,
  });
  const catchAllRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "$",
    component: () => null,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([pageRoute, catchAllRoute]),
    history: createMemoryHistory({ initialEntries: [path] }),
  });

  await router.load();

  let result!: RenderResult;
  await act(async () => {
    result = render(
      <QueryClientProvider client={queryClient}>
        <ChakraSystemProvider>
          <RouterProvider router={router} />
        </ChakraSystemProvider>
      </QueryClientProvider>,
    );
  });

  return { ...result, router, queryClient };
};
