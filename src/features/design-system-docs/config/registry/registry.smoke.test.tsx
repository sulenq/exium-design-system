// src/features/design-system-docs/config/registry/registry.smoke.test.tsx

import { ACTIONS_DOCS } from "@/features/design-system-docs/config/registry/actions.registry";
import { CHART_DOCS } from "@/features/design-system-docs/config/registry/chart.registry";
import { DISPLAY_DOCS } from "@/features/design-system-docs/config/registry/display.registry";
import { FEEDBACK_DOCS } from "@/features/design-system-docs/config/registry/feedback.registry";
import { INPUTS_DOCS } from "@/features/design-system-docs/config/registry/inputs.registry";
import { LAYOUT_DOCS } from "@/features/design-system-docs/config/registry/layout.registry";
import { NAVIGATION_DOCS } from "@/features/design-system-docs/config/registry/navigation.registry";
import { PRIMITIVES_DOCS } from "@/features/design-system-docs/config/registry/primitives.registry";
import { COMPONENTS_REGISTRY } from "@/features/design-system-docs/config/components-registry";
import { DS_NAV_GROUPS_LIST } from "@/features/design-system-docs/constants/ds.nav-groups";
import { DS_NAVS_MAP } from "@/features/design-system-docs/constants/ds.navs";
import { renderWithSystem } from "@/test/render";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

// Map pages need WebGL (MapLibre), which jsdom does not provide; they are covered by
// typecheck and the production build instead.
const RENDERABLE = {
  ...LAYOUT_DOCS,
  ...FEEDBACK_DOCS,
  ...ACTIONS_DOCS,
  ...INPUTS_DOCS,
  ...NAVIGATION_DOCS,
  ...CHART_DOCS,
  ...DISPLAY_DOCS,
  ...PRIMITIVES_DOCS,
};
const SKIP_IN_JSDOM = new Set([
  "gis_app_shell",
  "area_chart",
  "bar_chart",
  "chart_tooltip",
  "donut_chart",
  "line_chart",
  "pie_chart",
  "radar_chart",
  "scatter_chart",
  "sparkline",
]);

async function renderInRouter(node: React.ReactNode) {
  const rootRoute = createRootRoute({ component: () => <>{node}</> });
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ["/design-system/ui"] }),
  });
  await router.load();
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return renderWithSystem(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

// Playgrounds must not reach the network (e.g. the exchange-rate demo)
beforeAll(() => {
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline in tests"));
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("docs registry", () => {
  it("has a nav entry and a group for every component page", () => {
    const grouped = new Set(
      JSON.stringify(DS_NAV_GROUPS_LIST).match(/"key":"(\w+)"/g)?.map((m) => m.slice(7, -1)),
    );
    for (const key of Object.keys(COMPONENTS_REGISTRY)) {
      expect(DS_NAVS_MAP, `nav entry for ${key}`).toHaveProperty(key);
      expect(grouped.has(key), `group for ${key}`).toBe(true);
    }
  });

  it("has no group label with '&'", () => {
    for (const [key, nav] of Object.entries(DS_NAVS_MAP)) {
      if (key.startsWith("cat_")) expect(nav.title, key).not.toContain("&");
    }
  });

  it.each(Object.entries(RENDERABLE).filter(([key]) => !SKIP_IN_JSDOM.has(key)))(
    "%s playground renders",
    async (_key, spec) => {
      const node = spec.renderPlayground?.(spec.defaultProps ?? {});
      const { container } = await renderInRouter(node);
      expect(container.innerHTML.length).toBeGreaterThan(0);
    },
  );
});
