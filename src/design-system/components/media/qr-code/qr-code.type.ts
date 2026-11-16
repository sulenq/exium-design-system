// src/design-system/components/media/qr-code/qr-code.type.ts

import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import type { ReactNode } from "react";

export type QrCodeSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/** Share of the code that can be damaged or covered and still scan: L 7%, M 15%, Q 25%, H 30%. */
export type QrCodeErrorCorrection = "L" | "M" | "Q" | "H";

export type QrCodeProps = Omit<StackProps, "children"> & {
  /** Text or URL to encode. */
  value: string;
  size?: QrCodeSize;
  /** Default "M"; "H" when an `overlay` covers part of the code. */
  errorCorrection?: QrCodeErrorCorrection;
  /** Element centered on the code, e.g. a logo. Keep it small. */
  overlay?: ReactNode;
  /** Accessible description. Default: localized "QR code". */
  label?: string;
  /** Show a download button below the code. */
  downloadable?: boolean;
  /** File name of the downloaded PNG. Default "qr-code.png". */
  downloadFileName?: string;
};
