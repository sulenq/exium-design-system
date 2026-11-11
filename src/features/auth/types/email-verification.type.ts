// src/features/auth/types/email-verification.type.ts

import type { ApiResponse } from "@/shared/types/common-response.type";

export type EmailVerificationVerifyPayload = {
  email: string;
  token: string;
};

export type EmailVerificationVerifyData = {
  email: string;
  verified: boolean;
};

export type EmailVerificationVerifyResponse =
  ApiResponse<EmailVerificationVerifyData>;

export type EmailVerificationResendPayload = {
  email: string;
};

export type EmailVerificationResendData = {
  email: string;
  expiresIn?: number;
};

export type EmailVerificationResendResponse =
  ApiResponse<EmailVerificationResendData>;
