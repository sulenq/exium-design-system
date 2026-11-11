// src/features/auth/services/auth.email-verification.service.ts

import {
  postEmailVerificationResendApi,
  postEmailVerificationVerifyApi,
} from "@/features/auth/api/auth.email-verification.api";
import type {
  EmailVerificationResendData,
  EmailVerificationResendPayload,
  EmailVerificationVerifyData,
  EmailVerificationVerifyPayload,
} from "@/features/auth/types/email-verification.type";
import { ApiError } from "@/shared/libs/api-client/api-error";
import { isDummyDataEnabled } from "@/shared/utils/env/env.utils";

export const authEmailVerificationService = {
  verifyEmail: async (
    payload: EmailVerificationVerifyPayload,
    signal?: AbortSignal,
  ): Promise<EmailVerificationVerifyData> => {
    try {
      const response = await postEmailVerificationVerifyApi(payload, signal);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (!isDummyDataEnabled()) {
        throw error;
      }

      // Mock fallback for development environment when backend is offline and dummy data is enabled
      return {
        email: payload.email,
        verified: true,
      };
    }
  },

  resendVerificationEmail: async (
    payload: EmailVerificationResendPayload,
    signal?: AbortSignal,
  ): Promise<EmailVerificationResendData> => {
    try {
      const response = await postEmailVerificationResendApi(payload, signal);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (!isDummyDataEnabled()) {
        throw error;
      }

      // Mock fallback for development environment when backend is offline and dummy data is enabled
      return {
        email: payload.email,
        expiresIn: 300,
      };
    }
  },
};
