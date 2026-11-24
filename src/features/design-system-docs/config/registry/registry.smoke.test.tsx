// src/features/design-system-docs/config/registry/registry.smoke.test.tsx

import { ACTIONS_DOCS } from "@/features/design-system-docs/config/registry/actions.registry";
import { DISPLAY_DOCS } from "@/features/design-system-docs/config/registry/display.registry";
import { FEEDBACK_DOCS } from "@/features/design-system-docs/config/registry/feedback.registry";
import { INPUTS_DOCS } from "@/features/design-system-docs/config/registry/inputs.registry";
import { LAYOUT_DOCS } from "@/features/design-system-docs/config/registry/layout.registry";
import { NAVIGATION_DOCS } from "@/features/design-system-docs/config/registry/navigation.registry";
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
import { describe, expect, it } from "vitest";

// Map pages need WebGL (MapLibre), which jsdom does not provide; they are covered by
// typecheck and the production build instead.
const RENDERABLE = {
  ...LAYOUT_DOCS,
  ...FEEDBACK_DOCS,
  ...ACTIONS_DOCS,
  ...INPUTS_DOCS,
  ...NAVIGATION_DOCS,
  ...DISPLAY_DOCS,
};
const SKIP_IN_JSDOM = new Set(["gis_app_shell", "chart_tooltip"]);

async function renderInRouter(node: React.ReactNode) {
  const rootRoute = createRootRoute({ component: () => <>{node}</> });
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ["/design-system/ui"] }),
  });
  await router.load();
  return renderWithSystem(<RouterProvider router={router} />);
}

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
