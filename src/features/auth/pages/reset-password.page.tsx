// src/features/auth/pages/reset-password.page.tsx

import { ResetPasswordForm } from "@/features/auth/components/ui/reset-password.form";
import { SigninShell } from "@/features/auth/components/ui/signin-shell";
import type { ResetPasswordSearch } from "@/features/auth/types/forgot-password.type";

export const ResetPasswordPage = (props: ResetPasswordSearch) => {
  return (
    <SigninShell>
      <ResetPasswordForm {...props} px={[0, null, 8]} mt={8} />
    </SigninShell>
  );
};
