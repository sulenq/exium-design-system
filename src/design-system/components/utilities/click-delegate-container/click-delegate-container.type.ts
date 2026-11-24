// src/design-system/components/utilities/click-delegate-container/click-delegate-container.type.ts

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import type { RefObject } from "react";

export type ClickDelegateContainerProps = StackProps & {
  targetRef?: RefObject<HTMLElement | null>;
  onDelegateClick?: () => void;
};
