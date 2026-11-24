// src/test/vitest-axe.type.ts

import type { AxeMatchers } from "vitest-axe/matchers";

declare module "vitest" {
  interface Matchers<R extends void | Promise<void> = void | Promise<void>, T = unknown>
    extends AxeMatchers {
    readonly __axeMatchers?: [R, T];
  }
}
