// src/routes/design-system-v2/ui.tsx

import { DesignSystemV2DocsPage } from "@/features/design-system-v2-docs/components/design-system-docs.page";
import type { DsDocsSearchParams } from "@/features/design-system-v2-docs/types/ds-docs-navs.type";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const dsDocsSearchSchema = z.object({
  component: z.string().optional(),
});

export const Route = createFileRoute("/design-system-v2/ui")({
  validateSearch: (search: Record<string, unknown>): DsDocsSearchParams =>
    dsDocsSearchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  return <DesignSystemV2DocsPage />;
}

