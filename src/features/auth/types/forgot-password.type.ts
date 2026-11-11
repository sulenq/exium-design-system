// src/features/auth/types/forgot-password.type.ts

import type { createForgotPasswordSchema } from "@/features/auth/schemas/forgot-password.schema";
import type { z } from "zod";

export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;

export type ResetPasswordSearch = {
  email?: string;
  token?: string;
};
