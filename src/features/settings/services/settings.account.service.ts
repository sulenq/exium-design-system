// src/features/settings/services/settings.account.service.ts

import {
  patchAccountProfileApi,
  postAccountPasswordChangeApi,
} from "@/features/settings/api/settings.account.api";
import type {
  AccountPasswordChangeData,
  AccountPasswordChangePayload,
  AccountProfileUpdatePayload,
} from "@/features/settings/types/settings.account.type";
import { ApiError } from "@/shared/libs/api-client/api-error";
import type { User } from "@/shared/types/common-response.type";
import { setStorage } from "@/shared/utils/client/client.storage";
import { isDummyDataEnabled } from "@/shared/utils/env/env.utils";
import { getUserSession } from "@/shared/utils/user/user-session.utils";

export const settingsAccountService = {
  /**
   * Updates the signed-in user's profile and keeps the stored session in sync.
   */
  updateProfile: async (
    payload: AccountProfileUpdatePayload,
    signal?: AbortSignal,
  ): Promise<User> => {
    try {
      const response = await patchAccountProfileApi(payload, signal);
      const user = response.data.user;
      setStorage("user", JSON.stringify(user));
      return user;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (!isDummyDataEnabled()) {
        throw error;
      }

      // Mock fallback for development environment when backend is offline and dummy data is enabled
      const sessionUser = getUserSession();
      if (!sessionUser) {
        throw error;
      }

      const dummyUpdatedUser: User = {
        ...sessionUser,
        name: payload.name,
        updatedAt: new Date().toISOString(),
      };
      setStorage("user", JSON.stringify(dummyUpdatedUser));
      return dummyUpdatedUser;
    }
  },

  changePassword: async (
    payload: AccountPasswordChangePayload,
    signal?: AbortSignal,
  ): Promise<AccountPasswordChangeData> => {
    try {
      const response = await postAccountPasswordChangeApi(payload, signal);
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
        message: "Kata sandi berhasil diperbarui.",
      };
    }
  },
};
