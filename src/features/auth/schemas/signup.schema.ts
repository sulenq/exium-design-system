// src/features/auth/schemas/signup.schema.ts

import { t } from "@/shared/libs/i18n";
import { z } from "zod";

export const SIGNUP_PASSWORD_MIN_LENGTH = 8;

export const createSignupSchema = () =>
  z
    .object({
      name: z.string().trim().min(1, t["validation.required"]()),
      email: z
        .string()
        .min(1, t["validation.required"]())
        .pipe(z.email(t["validation.email_invalid"]())),
      password: z
        .string()
        .min(1, t["validation.required"]())
        .min(
          SIGNUP_PASSWORD_MIN_LENGTH,
          t["validation.password_too_short"]({
            min: SIGNUP_PASSWORD_MIN_LENGTH,
          }),
        ),
      confirmPassword: z.string().min(1, t["validation.required"]()),
      acceptTerms: z
        .boolean()
        .refine((value) => value === true, t["auth.signup.terms_required"]()),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: t["validation.password_mismatch"](),
      path: ["confirmPassword"],
    });
