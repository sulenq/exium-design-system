// src/design-system/components/media/camera-capture/camera-capture.frame.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import type { CameraFrameOverlayProps } from "@/design-system/components/media/camera-capture/camera-capture.type";
import { CAMERA_FRAME_VARIANTS } from "@/design-system/components/media/camera-capture/camera-capture.utils";

/** Dims everything outside the guide shape. */
const OUTSIDE_DIM = "0 0 0 9999px rgba(0, 0, 0, 0.5)";
const GUIDE_BORDER = "2px dashed rgba(255, 255, 255, 0.9)";

/**
 * Guide overlay for CameraCapture. The shape keeps its real-world ratio (KTP card,
 * A4 document, face oval) and is sized to the camera area, never stretched.
 */
export const CameraFrameOverlay = (props: CameraFrameOverlayProps) => {
  // Props
  const { variant } = props;

  // Derived Values
  const config = CAMERA_FRAME_VARIANTS[variant];
  const sizePercent = `${Math.round(config.size * 100)}%`;
  const isPortrait = config.ratio < 1;

  if (config.shape === "none") return null;

  if (config.shape === "oval-and-card") {
    return (
      <VStack
        pos={"absolute"}
        inset={0}
        justify={"center"}
        align={"center"}
        gap={3}
        pointerEvents={"none"}
        aria-hidden
        data-frame={variant}
      >
        <Box h={"46%"} aspectRatio={config.ratio} rounded={"50%"} border={GUIDE_BORDER} />
        <Box h={"20%"} aspectRatio={85.6 / 54} rounded={"md"} border={GUIDE_BORDER} />
      </VStack>
    );
  }

  return (
    <Box
      pos={"absolute"}
      top={"50%"}
      left={"50%"}
      transform={"translate(-50%, -50%)"}
      w={isPortrait ? undefined : sizePercent}
      h={isPortrait ? sizePercent : undefined}
      maxW={"92%"}
      maxH={"78%"}
      aspectRatio={config.ratio}
      rounded={config.shape === "oval" ? "50%" : "lg"}
      border={GUIDE_BORDER}
      boxShadow={OUTSIDE_DIM}
      pointerEvents={"none"}
      aria-hidden
      data-frame={variant}
    />
  );
};
