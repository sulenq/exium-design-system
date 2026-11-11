// src/routes/auth.reset-password.tsx

import { ResetPasswordPage } from "@/features/auth/pages/reset-password.page";
import type { ResetPasswordSearch } from "@/features/auth/types/forgot-password.type";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/reset-password")({
  validateSearch: (search: Record<string, unknown>): ResetPasswordSearch => {
    return {
      email: typeof search.email === "string" ? search.email : undefined,
      token: typeof search.token === "string" ? search.token : undefined,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { email, token } = Route.useSearch();

  return <ResetPasswordPage email={email} token={token} />;
}
