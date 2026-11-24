// src/test/render.tsx

import { ChakraSystemProvider } from "@/design-system/chakra/providers/chakra-system.provider";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

/** Render inside the Exium Chakra system so recipes and semantic tokens resolve. */
export function renderWithSystem(ui: ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: ChakraSystemProvider, ...options });
}
