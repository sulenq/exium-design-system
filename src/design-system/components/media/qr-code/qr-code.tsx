// src/design-system/components/media/qr-code/qr-code.tsx

import { Button } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import type { QrCodeProps } from "@/design-system/components/media/qr-code/qr-code.type";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { QrCode as ChakraQrCode } from "@chakra-ui/react";
import { DownloadSimpleIcon as DownloadIcon } from "@phosphor-icons/react";

export const QrCode = (props: QrCodeProps) => {
  // Props
  const {
    value,
    size = "md",
    errorCorrection,
    overlay,
    label,
    downloadable = false,
    downloadFileName = "qr-code.png",
    ...restProps
  } = props;

  // Stores
  const { theme } = useThemeStore();

  // Derived Values
  const hasOverlay = Boolean(overlay);
  // A covered center needs the strongest error correction to stay scannable
  const resolvedErrorCorrection = errorCorrection ?? (hasOverlay ? "H" : "M");
  const resolvedLabel = label ?? t["common.qr_code"]();

  return (
    <VStack align={"center"} w={"fit-content"} {...restProps}>
      <ChakraQrCode.Root
        value={value}
        size={size}
        encoding={{ ecc: resolvedErrorCorrection }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"stretch"}
        gap={3}
      >
        {/* Always dark-on-white with a quiet zone: inverted codes scan unreliably in dark mode */}
        <Box
          role={"img"}
          aria-label={resolvedLabel}
          position={"relative"}
          p={3}
          bg={"white"}
          rounded={theme.radii.component}
          border={"1px solid"}
          borderColor={"border.muted"}
        >
          <ChakraQrCode.Frame>
            <ChakraQrCode.Pattern fill={"black"} />
          </ChakraQrCode.Frame>

          {hasOverlay && (
            <ChakraQrCode.Overlay bg={"white"} p={1}>
              {overlay}
            </ChakraQrCode.Overlay>
          )}
        </Box>

        {downloadable && (
          <ChakraQrCode.DownloadTrigger
            asChild={true}
            fileName={downloadFileName}
            mimeType={"image/png"}
          >
            <Button variant={"outline"}>
              <AppIcon icon={DownloadIcon} />
              {t["action.download"]()}
            </Button>
          </ChakraQrCode.DownloadTrigger>
        )}
      </ChakraQrCode.Root>
    </VStack>
  );
};
