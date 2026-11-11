// src/features/auth/services/auth.email-verification.service.test.ts

import * as emailVerificationApi from "@/features/auth/api/auth.email-verification.api";
import { authEmailVerificationService } from "@/features/auth/services/auth.email-verification.service";
import { ApiError } from "@/shared/libs/api-client/api-error";
import { afterEach, describe, expect, it, vi } from "vitest";

const envelope = <T,>(data: T) => ({
  success: true,
  message: "ok",
  data,
  timestamp: "2026-01-01T00:00:00.000Z",
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("authEmailVerificationService.verifyEmail", () => {
  const payload = { email: "ada@example.com", token: "tok-123" };

  it("returns the backend data", async () => {
    const verifySpy = vi
      .spyOn(emailVerificationApi, "postEmailVerificationVerifyApi")
      .mockResolvedValue(
        envelope({ email: "ada@example.com", verified: true }),
      );

    await expect(
      authEmailVerificationService.verifyEmail(payload),
    ).resolves.toEqual({ email: "ada@example.com", verified: true });
    expect(verifySpy.mock.calls[0][0]).toEqual(payload);
  });

  it("rethrows an invalid-token error even with the dummy fallback on", async () => {
    vi.stubEnv("VITE_ENABLE_DUMMY_RESPONSE_FALLBACK", "true");
    vi.spyOn(
      emailVerificationApi,
      "postEmailVerificationVerifyApi",
    ).mockRejectedValue(new ApiError("Token tidak valid", 400));

    await expect(
      authEmailVerificationService.verifyEmail(payload),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it("rethrows network errors when the dummy fallback is disabled", async () => {
    vi.stubEnv("VITE_ENABLE_DUMMY_RESPONSE_FALLBACK", "false");
    vi.spyOn(
      emailVerificationApi,
      "postEmailVerificationVerifyApi",
    ).mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(
      authEmailVerificationService.verifyEmail(payload),
    ).rejects.toBeInstanceOf(TypeError);
  });

  it("returns a mock result on network errors when the dummy fallback is enabled", async () => {
    vi.stubEnv("VITE_ENABLE_DUMMY_RESPONSE_FALLBACK", "true");
    vi.spyOn(
      emailVerificationApi,
      "postEmailVerificationVerifyApi",
    ).mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(
      authEmailVerificationService.verifyEmail(payload),
    ).resolves.toEqual({ email: "ada@example.com", verified: true });
  });
});

describe("authEmailVerificationService.resendVerificationEmail", () => {
  it("returns the backend data", async () => {
    vi.spyOn(
      emailVerificationApi,
      "postEmailVerificationResendApi",
    ).mockResolvedValue(envelope({ email: "ada@example.com", expiresIn: 600 }));

    await expect(
      authEmailVerificationService.resendVerificationEmail({
        email: "ada@example.com",
      }),
    ).resolves.toEqual({ email: "ada@example.com", expiresIn: 600 });
  });
});
