// src/features/settings/api/settings.account.api.ts

import type {
  AccountPasswordChangePayload,
  AccountPasswordChangeResponse,
  AccountProfileUpdatePayload,
  AccountProfileUpdateResponse,
} from "@/features/settings/types/settings.account.type";
import { apiClient } from "@/shared/libs/api-client/api-client";

export const patchAccountProfileApi = async (
  payload: AccountProfileUpdatePayload,
  signal?: AbortSignal,
): Promise<AccountProfileUpdateResponse> => {
  return apiClient.patch<AccountProfileUpdateResponse>(
    "/api/auth/me",
    payload,
    { signal },
  );
};

export const postAccountPasswordChangeApi = async (
  payload: AccountPasswordChangePayload,
  signal?: AbortSignal,
): Promise<AccountPasswordChangeResponse> => {
  return apiClient.post<AccountPasswordChangeResponse>(
    "/api/auth/change-password",
    payload,
    { signal },
  );
};
