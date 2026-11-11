// src/features/auth/api/auth.email-verification.api.ts

import type {
  EmailVerificationResendPayload,
  EmailVerificationResendResponse,
  EmailVerificationVerifyPayload,
  EmailVerificationVerifyResponse,
} from "@/features/auth/types/email-verification.type";
import { apiClient } from "@/shared/libs/api-client/api-client";

export const postEmailVerificationVerifyApi = async (
  payload: EmailVerificationVerifyPayload,
  signal?: AbortSignal,
): Promise<EmailVerificationVerifyResponse> => {
  return apiClient.post<EmailVerificationVerifyResponse>(
    "/api/auth/email/verify",
    payload,
    { signal },
  );
};

export const postEmailVerificationResendApi = async (
  payload: EmailVerificationResendPayload,
  signal?: AbortSignal,
): Promise<EmailVerificationResendResponse> => {
  return apiClient.post<EmailVerificationResendResponse>(
    "/api/auth/email/resend",
    payload,
    { signal },
  );
};
