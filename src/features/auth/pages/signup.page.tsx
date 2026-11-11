// src/features/auth/pages/signup.page.tsx

import { SigninShell } from "@/features/auth/components/ui/signin-shell";
import { SignupForm } from "@/features/auth/components/ui/signup.form";

export const SignupPage = () => {
  return (
    <SigninShell>
      <SignupForm px={[0, null, 8]} mt={8} />
    </SigninShell>
  );
};
