// src/routes/index.tsx

import { SigninShell } from "@/features/auth/components/ui/signin-shell";
import { SigninForm } from "@/features/auth/components/ui/signin.form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SigninShell>
      <SigninForm px={[0, null, 8]} mt={8} />
    </SigninShell>
  );
}
