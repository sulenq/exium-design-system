// src/design-system/components/feedback/confirmation-trigger/confirmation-trigger.tsx

import type {
  ConfirmationTriggerProps,
  SlideToConfirmProps,
} from "@/design-system/components/feedback/confirmation-trigger/confirmation-trigger.type";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Box, Circle } from "@/design-system/components/layout/box/box";
import { AbsoluteCenter } from "@/design-system/components/layout/center/center";
import {
  HStack,
  VStack,
} from "@/design-system/components/layout/flex-box/flex-box";
import { usePopDisclosure } from "@/design-system/components/overlay/hooks/use-pop-disclosure";
import { Modal } from "@/design-system/components/overlay/modal/modal";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { tintLight } from "@/shared/utils/style/color";
import {
  WarningIcon as AlertTriangleIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import {
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type PointerEvent,
} from "react";

const SlideToConfirm = (props: SlideToConfirmProps) => {
  // Props
  const { label, colorPalette, onConfirm } = props;

  // Stores
  const { theme } = useThemeStore();

  // Refs
  const trackRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef<number>(0);
  const maxOffsetRef = useRef<number>(0);

  // States
  const [offsetX, setOffsetX] = useState<number>(0);
  const [trackWidth, setTrackWidth] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isThresholdReached, setIsThresholdReached] = useState<boolean>(false);

  // Effects
  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.clientWidth);
    }
  }, []);

  // Handlers
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    setTrackWidth(track.clientWidth);
    const thumbSize = 36;
    const padding = 4;
    maxOffsetRef.current = Math.max(
      0,
      track.clientWidth - thumbSize - padding * 2,
    );
    startXRef.current = e.clientX - offsetX;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const next = Math.min(
      Math.max(0, e.clientX - startXRef.current),
      maxOffsetRef.current,
    );
    setOffsetX(next);
    setIsThresholdReached(
      maxOffsetRef.current > 0 && next >= maxOffsetRef.current * 0.85,
    );
  };

  const handlePointerEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = maxOffsetRef.current * 0.85;
    if (maxOffsetRef.current > 0 && offsetX >= threshold) {
      setOffsetX(maxOffsetRef.current);
      setIsThresholdReached(true);
      onConfirm();
      return;
    }
    setOffsetX(0);
    setIsThresholdReached(false);
  };

  return (
    <HStack
      ref={trackRef}
      position={"relative"}
      w={"full"}
      h={"fit"}
      p={1}
      rounded={theme.radii.container}
      bg={"bg.subtle"}
      overflow={"hidden"}
      userSelect={"none"}
      touchAction={"none"}
    >
      <AbsoluteCenter w={"full"} px={12} zIndex={0} pointerEvents={"none"}>
        <P
          fontSize={"sm"}
          fontWeight={"medium"}
          color={"fg.muted"}
          lineClamp={1}
        >
          {label}
        </P>
      </AbsoluteCenter>

      <Box
        position={"relative"}
        zIndex={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        w={`${offsetX + 40}px`}
        h={"fit"}
        // p={1}
        rounded={theme.radii.component}
        bg={`linear-gradient(to right, {colors.${colorPalette}.solid}, ${tintLight(`${colorPalette}.solid`, 20)})`}
        transition={
          isDragging ? "none" : "width 220ms cubic-bezier(0.22, 1, 0.36, 1)"
        }
      >
        <AbsoluteCenter
          left={trackWidth > 0 ? `${trackWidth / 2 - 4}px` : "50%"}
          w={trackWidth > 0 ? `${trackWidth}px` : "full"}
          px={12}
          zIndex={1}
          pointerEvents={"none"}
        >
          <P
            fontSize={"sm"}
            fontWeight={"semibold"}
            color={`${colorPalette}.contrast`}
            opacity={isThresholdReached ? 1 : 0}
            transform={
              isThresholdReached ? "translateX(0)" : "translateX(-12px)"
            }
            transition={
              "opacity 200ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)"
            }
            lineClamp={1}
          >
            {"Konfirmasi"}
          </P>
        </AbsoluteCenter>

        <Box
          position={"relative"}
          zIndex={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          aspectRatio={1}
          w={"40px"}
          h={"40px"}
          rounded={theme.radii.component}
          bg={"bg.body"}
          border={"1px solid"}
          borderColor={"bg.body"}
          shadow={"md"}
          color={`${colorPalette}.fg`}
          cursor={isDragging ? "grabbing" : "grab"}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          <AppIcon icon={ArrowRightIcon} />
        </Box>
      </Box>
    </HStack>
  );
};

export const ConfirmationTrigger = (props: ConfirmationTriggerProps) => {
  // Props
  const {
    children,
    title,
    desc,
    description,
    confirmLabel,
    colorPalette,
    icon,
    modalKey,
    onConfirm,
    onCancel,
  } = props;

  // Stores
  const { theme } = useThemeStore();

  // Hooks (Modal)
  const popModal = usePopDisclosure({
    modalKey,
  });

  // Resolved Values
  const resolvedColorPalette = colorPalette ?? theme.colorPalette;
  const resolvedTitle = title ?? t["action.confirm"]?.() ?? "Konfirmasi";
  const resolvedDesc =
    description ??
    desc ??
    t["confirm.default_description"]?.() ??
    "Tindakan ini akan diproses pada sistem.";

  // Handlers
  const handleCancel = () => {
    popModal.close();
    void Promise.resolve(onCancel?.()).catch(console.error);
  };

  const handleConfirm = () => {
    setTimeout(() => {
      popModal.close();
      void Promise.resolve(onConfirm?.()).catch(console.error);
    }, 220);
  };

  return (
    <>
      <Modal.Root
        modalKey={popModal.modalKey}
        opened={popModal.isOpen}
        open={popModal.open}
        close={handleCancel}
      >
        <Modal.Trigger>{children}</Modal.Trigger>

        <Modal.Content>
          <Modal.CloseButton zIndex={2} />

          <Modal.Body pt={8} pb={6}>
            <VStack align={"center"} gap={4}>
              <Circle
                pos={"relative"}
                size={"76px"}
                bg={`${resolvedColorPalette}.muted/40`}
                color={`${resolvedColorPalette}.fg`}
                mb={4}
              >
                <AbsoluteCenter>
                  <Circle size={"52px"} bg={`${resolvedColorPalette}.muted`} />
                </AbsoluteCenter>

                {icon ? (
                  isValidElement(icon) ? (
                    icon
                  ) : (
                    <AppIcon
                      icon={icon as ComponentType}
                      size={"lg"}
                      zIndex={2}
                    />
                  )
                ) : (
                  <AppIcon icon={AlertTriangleIcon} size={"lg"} zIndex={2} />
                )}
              </Circle>

              <Heading size={"md"} fontWeight={"semibold"} textAlign={"center"}>
                {resolvedTitle}
              </Heading>

              <P
                fontSize={"sm"}
                color={"fg.muted"}
                textAlign={"center"}
                maxW={"260px"}
              >
                {resolvedDesc}
              </P>
            </VStack>
          </Modal.Body>

          <Modal.Footer>
            <SlideToConfirm
              label={
                confirmLabel
                  ? `Geser untuk ${confirmLabel}`
                  : "Geser untuk konfirmasi"
              }
              colorPalette={resolvedColorPalette}
              onConfirm={handleConfirm}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
