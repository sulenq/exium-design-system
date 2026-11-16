// src/features/settings/services/settings.account.service.test.ts

import * as settingsAccountApi from "@/features/settings/api/settings.account.api";
import { settingsAccountService } from "@/features/settings/services/settings.account.service";
import { ApiError } from "@/shared/libs/api-client/api-error";
import type { InternalUser } from "@/shared/types/common-response.type";
import { getUserSession } from "@/shared/utils/user/user-session.utils";
import { setStorage } from "@/shared/utils/client/client.storage";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sessionUser: InternalUser = {
  id: "1",
  email: "ada@example.com",
  name: "Ada",
  role: "internal",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

const envelope = <T,>(data: T) => ({
  success: true,
  message: "ok",
  data,
  timestamp: "2026-01-01T00:00:00.000Z",
});

beforeEach(() => {
  localStorage.clear();
  setStorage("user", JSON.stringify(sessionUser));
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("settingsAccountService.updateProfile", () => {
  it("returns the updated user and syncs the stored session", async () => {
    const updatedUser = { ...sessionUser, name: "Ada Lovelace" };
    vi.spyOn(settingsAccountApi, "patchAccountProfileApi").mockResolvedValue(
      envelope({ user: updatedUser }),
    );

    const result = await settingsAccountService.updateProfile({
      name: "Ada Lovelace",
    });

    expect(result).toEqual(updatedUser);
    expect(getUserSession()?.name).toBe("Ada Lovelace");
  });

  it("rethrows backend errors without touching the session", async () => {
    vi.stubEnv("VITE_ENABLE_DUMMY_RESPONSE_FALLBACK", "true");
    vi.spyOn(settingsAccountApi, "patchAccountProfileApi").mockRejectedValue(
      new ApiError("Nama tidak valid", 422),
    );

    await expect(
      settingsAccountService.updateProfile({ name: "" }),
    ).rejects.toBeInstanceOf(ApiError);
    expect(getUserSession()?.name).toBe("Ada");
  });

  it("rethrows network errors when the dummy fallback is disabled", async () => {
    vi.stubEnv("VITE_ENABLE_DUMMY_RESPONSE_FALLBACK", "false");
    vi.spyOn(settingsAccountApi, "patchAccountProfileApi").mockRejectedValue(
      new TypeError("Failed to fetch"),
    );

    await expect(
      settingsAccountService.updateProfile({ name: "Ada Lovelace" }),
    ).rejects.toBeInstanceOf(TypeError);
    expect(getUserSession()?.name).toBe("Ada");
  });

  it("falls back to the session user when the dummy fallback is enabled", async () => {
    vi.stubEnv("VITE_ENABLE_DUMMY_RESPONSE_FALLBACK", "true");
    vi.spyOn(settingsAccountApi, "patchAccountProfileApi").mockRejectedValue(
      new TypeError("Failed to fetch"),
    );

    const result = await settingsAccountService.updateProfile({
      name: "Ada Lovelace",
    });

    expect(result.name).toBe("Ada Lovelace");
    expect(result.email).toBe("ada@example.com");
    expect(getUserSession()?.name).toBe("Ada Lovelace");
  });
});

describe("settingsAccountService.changePassword", () => {
  it("returns the backend data", async () => {
    vi.spyOn(
      settingsAccountApi,
      "postAccountPasswordChangeApi",
    ).mockResolvedValue(envelope({ message: "updated" }));

    await expect(
      settingsAccountService.changePassword({
        currentPassword: "old-secret",
        newPassword: "new-secret",
      }),
    ).resolves.toEqual({ message: "updated" });
  });

  it("rethrows a wrong-current-password error even with the dummy fallback on", async () => {
    vi.stubEnv("VITE_ENABLE_DUMMY_RESPONSE_FALLBACK", "true");
    vi.spyOn(
      settingsAccountApi,
      "postAccountPasswordChangeApi",
    ).mockRejectedValue(new ApiError("Kata sandi saat ini salah", 400));

    await expect(
      settingsAccountService.changePassword({
        currentPassword: "wrong",
        newPassword: "new-secret",
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });
});
