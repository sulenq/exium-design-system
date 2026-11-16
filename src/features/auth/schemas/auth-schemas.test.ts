// src/features/auth/schemas/auth-schemas.test.ts

import { createForgotPasswordSchema } from "@/features/auth/schemas/forgot-password.schema";
import { createSignupSchema } from "@/features/auth/schemas/signup.schema";
import { describe, expect, it } from "vitest";

const validSignup = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  password: "supersecret",
  confirmPassword: "supersecret",
  acceptTerms: true,
};

describe("createSignupSchema", () => {
  const schema = createSignupSchema();

  it("accepts valid input", () => {
    expect(schema.safeParse(validSignup).success).toBe(true);
  });

  it("rejects an empty name", () => {
    const result = schema.safeParse({ ...validSignup, name: "   " });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = schema.safeParse({ ...validSignup, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a password shorter than 8 characters", () => {
    const result = schema.safeParse({
      ...validSignup,
      password: "short",
      confirmPassword: "short",
    });
    expect(result.success).toBe(false);
  });

  it("reports a mismatch on confirmPassword", () => {
    const result = schema.safeParse({
      ...validSignup,
      confirmPassword: "different-password",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["confirmPassword"]);
    }
  });

  it("requires the terms to be accepted", () => {
    const result = schema.safeParse({ ...validSignup, acceptTerms: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["acceptTerms"]);
    }
  });
});

describe("createForgotPasswordSchema", () => {
  const schema = createForgotPasswordSchema();

  it("accepts a valid email", () => {
    expect(schema.safeParse({ email: "ada@example.com" }).success).toBe(true);
  });

  it("rejects an empty or malformed email", () => {
    expect(schema.safeParse({ email: "" }).success).toBe(false);
    expect(schema.safeParse({ email: "nope" }).success).toBe(false);
  });
});
