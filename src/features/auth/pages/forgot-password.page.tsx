// src/features/auth/pages/forgot-password.page.tsx

import { ForgotPasswordForm } from "@/features/auth/components/ui/forgot-password.form";
import { SigninShell } from "@/features/auth/components/ui/signin-shell";

export const ForgotPasswordPage = () => {
  return (
    <SigninShell>
      <ForgotPasswordForm px={[0, null, 8]} mt={8} />
    </SigninShell>
  );
};
