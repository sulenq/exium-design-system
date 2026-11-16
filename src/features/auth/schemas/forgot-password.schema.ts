// src/features/auth/schemas/forgot-password.schema.ts

import { t } from "@/shared/libs/i18n";
import { z } from "zod";

export const createForgotPasswordSchema = () =>
  z.object({
    email: z
      .string()
      .min(1, t["validation.required"]())
      .pipe(z.email(t["validation.email_invalid"]())),
  });
