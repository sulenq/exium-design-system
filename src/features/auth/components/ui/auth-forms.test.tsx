// src/features/auth/components/ui/auth-forms.test.tsx

import { ForgotPasswordForm } from "@/features/auth/components/ui/forgot-password.form";
import { ResetPasswordForm } from "@/features/auth/components/ui/reset-password.form";
import { SignupForm } from "@/features/auth/components/ui/signup.form";
import { authService } from "@/features/auth/services/auth.service";
import { renderWithProviders } from "@/test/render-with-providers";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("SignupForm", () => {
  it("has no detectable accessibility violations", async () => {
    const { container } = await renderWithProviders(<SignupForm />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("shows validation errors and does not submit an empty form", async () => {
    const registerSpy = vi.spyOn(authService, "register");
    await renderWithProviders(<SignupForm />);

    await userEvent.click(screen.getByRole("button", { name: /daftar|register/i }));

    expect((await screen.findAllByText(/wajib diisi|required/i)).length).toBeGreaterThan(0);
    expect(registerSpy).not.toHaveBeenCalled();
  });

  it("submits valid values without the confirmPassword/acceptTerms fields", async () => {
    const registerSpy = vi
      .spyOn(authService, "register")
      .mockResolvedValue({ message: "ok", email: "ada@example.com" });
    await renderWithProviders(<SignupForm />);

    const [nameInput] = screen.getAllByRole("textbox");
    await userEvent.type(nameInput, "Ada Lovelace");
    await userEvent.type(screen.getByRole("textbox", { name: /email/i }), "ada@example.com");

    const passwordInputs = document.querySelectorAll<HTMLInputElement>(
      'input[autocomplete="new-password"]',
    );
    await userEvent.type(passwordInputs[0], "supersecret");
    await userEvent.type(passwordInputs[1], "supersecret");
    await userEvent.click(screen.getByRole("checkbox"));
    await userEvent.click(screen.getByRole("button", { name: /daftar|register/i }));

    await waitFor(() => expect(registerSpy).toHaveBeenCalledTimes(1));
    expect(registerSpy.mock.calls[0][0]).toEqual({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "supersecret",
    });
  });
});

describe("ForgotPasswordForm", () => {
  it("has no detectable accessibility violations", async () => {
    const { container } = await renderWithProviders(<ForgotPasswordForm />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("requests a reset and shows the confirmation state", async () => {
    const requestSpy = vi.spyOn(authService, "requestResetPassword").mockResolvedValue({
      message: "ok",
      email: "ada@example.com",
    });
    await renderWithProviders(<ForgotPasswordForm />);

    await userEvent.type(
      screen.getByRole("textbox", { name: /email/i }),
      "ada@example.com",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /kirim tautan|send reset link/i }),
    );

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1));
    expect(requestSpy.mock.calls[0][0]).toEqual({ email: "ada@example.com" });
    expect(await screen.findByText(/ada@example\.com/)).toBeInTheDocument();
  });
});

describe("ResetPasswordForm", () => {
  it("shows the invalid-link state when email or token is missing", async () => {
    await renderWithProviders(<ResetPasswordForm />);

    expect(
      await screen.findByText(/tautan tidak valid|invalid or expired link/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /perbarui|update password/i })).toBeNull();
  });

  it("confirms the new password using the email and token from the link", async () => {
    const confirmSpy = vi
      .spyOn(authService, "confirmResetPassword")
      .mockResolvedValue({ success: true, message: "ok" });
    await renderWithProviders(
      <ResetPasswordForm email={"ada@example.com"} token={"tok-123"} />,
    );

    const inputs = document.querySelectorAll<HTMLInputElement>(
      'input[autocomplete="new-password"]',
    );
    await userEvent.type(inputs[0], "supersecret");
    await userEvent.type(inputs[1], "supersecret");
    await userEvent.click(
      screen.getByRole("button", { name: /perbarui|update password/i }),
    );

    await waitFor(() => expect(confirmSpy).toHaveBeenCalledTimes(1));
    expect(confirmSpy.mock.calls[0][0]).toMatchObject({
      email: "ada@example.com",
      resetToken: "tok-123",
      newPassword: "supersecret",
    });
  });
});
