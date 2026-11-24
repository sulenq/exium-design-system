// src/design-system/components/utilities/offline-alert/offline-alert.tsx

"use client";

import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Box, Circle } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { P } from "@/design-system/components/typography/p/p";
import type { OfflineAlertProps } from "@/design-system/components/utilities/offline-alert/offline-alert.type";
import { t } from "@/shared/libs/i18n";
import { toast } from "@/design-system/components/toast";

import { Portal } from "@/design-system/components/utilities/portal/portal";
import { WifiOffIcon } from "lucide-react";


import { useCallback, useEffect, useRef, useState } from "react";

export const OfflineAlert = (props: OfflineAlertProps) => {
  // Props
  const { persistent = true } = props;

  // States
  const [isVisible, setIsVisible] = useState(false);
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false,
  );

  // Refs
  const isOfflineRef = useRef(
    typeof navigator !== "undefined" ? !navigator.onLine : false,
  );
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handlers
  const triggerAlert = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    setIsVisible(true);
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, []);

  const handleOffline = useCallback(() => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      isOfflineRef.current = true;
      setIsOffline(true);
      triggerAlert();
    }
  }, [triggerAlert]);

  const handleOnline = useCallback(() => {
    isOfflineRef.current = false;
    setIsOffline(false);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    setIsVisible(false);
    toast.create({
      variant: "success",
      title: t["offline_alert.back_online"](),
    });
  }, []);

  // Effects
  useEffect(() => {
    // Polling every 10 seconds to verify actual connectivity
    const pollInterval = setInterval(() => {
      const isCurrentlyOffline =
        typeof navigator !== "undefined" ? !navigator.onLine : false;

      if (isCurrentlyOffline) {
        isOfflineRef.current = true;
        setIsOffline(true);
        triggerAlert();
      } else if (isOfflineRef.current) {
        handleOnline();
      }
    }, 10000);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    window.addEventListener("app:network-offline", handleOffline);

    return () => {
      clearInterval(pollInterval);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("app:network-offline", handleOffline);
    };
  }, [handleOffline, handleOnline, triggerAlert]);

  return (
    <Portal>
      {/* Persistent, non-blocking indicator for as long as the device stays offline */}
      {persistent && isOffline && (
        <HStack
          role={"status"}
          aria-live={"polite"}
          pos={"fixed"}
          top={"calc(env(safe-area-inset-top) + 8px)"}
          left={"50%"}
          transform={"translateX(-50%)"}
          zIndex={"max"}
          gap={2}
          px={3}
          py={1}
          rounded={"full"}
          bg={"red.subtle"}
          color={"red.fg"}
          borderWidth={"1px"}
          borderColor={"red.muted"}
          pointerEvents={"none"}
        >
          <AppIcon icon={WifiOffIcon} boxSize={4} />
          <P fontSize={"sm"} fontWeight={"medium"}>
            {t["offline_alert.title"]()}
          </P>
        </HStack>
      )}

      <Box
        aria-hidden={true}
        pos={"fixed"}
        inset={0}
        zIndex={"max"}
        pointerEvents={"none"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        p={4}
        opacity={isVisible ? 1 : 0}
        transform={isVisible ? "scale(1)" : "scale(0.95)"}
        transition={
          "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1)"
        }
        // bg={"bodyDarkAlpha/50"}
      >
        <VStack align={"center"} gap={4} textAlign={"center"} zIndex={2}>
          <Box
            pos={"relative"}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {/* Outer expanding elegant pulse ripple */}
            <Circle
              pos={"absolute"}
              inset={0}
              size={"76px"}
              bg={"red.emphasized"}
              opacity={0.35}
              pointerEvents={"none"}
              animation={"ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"}
            />

            {/* Inner Icon Circle */}
            <Circle
              size={"76px"}
              pos={"relative"}
              bg={"red.muted"}
              color={"red.fg"}
              border={"12px solid"}
              borderColor={"red.subtle"}
            >
              <AppIcon icon={WifiOffIcon} size={"lg"} />
            </Circle>
          </Box>

          {/* <VStack gap={2} align={"center"}>
            <Heading size={"md"} fontWeight={"semibold"} color={"fg.default"}>
              {t["offline_alert.title"]()}
            </Heading>
            <P fontSize={"sm"} color={"fg.muted"} maxW={"300px"}>
              {t["offline_alert.description"]()}
            </P>
          </VStack> */}
        </VStack>
      </Box>
    </Portal>
  );
};
