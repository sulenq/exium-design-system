// src/routes/demo.tsx

import { DemoPage } from "@/features/design-system-docs/components/demo/demo.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DemoPage />;
}
