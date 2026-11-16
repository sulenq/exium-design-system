// src/features/settings/types/settings.account.type.ts

import type { ApiResponse, User } from "@/shared/types/common-response.type";

export type AccountProfileUpdatePayload = {
  name: string;
};

export type AccountProfileUpdateResponse = ApiResponse<{ user: User }>;

export type AccountPasswordChangePayload = {
  currentPassword: string;
  newPassword: string;
};

export type AccountPasswordChangeData = {
  message: string;
};

export type AccountPasswordChangeResponse =
  ApiResponse<AccountPasswordChangeData>;
