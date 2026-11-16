// src/features/auth/types/signup.type.ts

import type { createSignupSchema } from "@/features/auth/schemas/signup.schema";
import type { ApiResponse } from "@/shared/types/common-response.type";
import type { z } from "zod";

export type SignupFormValues = z.infer<ReturnType<typeof createSignupSchema>>;

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type SignupData = {
  message: string;
  email: string;
};

export type SignupResponse = ApiResponse<SignupData>;
