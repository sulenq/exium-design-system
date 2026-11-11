// src/test/vitest-axe.d.ts

import type { AxeMatchers } from "vitest-axe";

declare module "vitest" {
  // Type parameter name must match vitest's own declaration to merge
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
