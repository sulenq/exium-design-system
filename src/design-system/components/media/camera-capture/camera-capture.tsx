// src/design-system/components/media/camera-capture/camera-capture.tsx

"use client";

import { Button, IconButton } from "@/design-system/components/button/button/button";
import { Loader } from "@/design-system/components/feedback/loader/loader";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { CameraFrameOverlay } from "@/design-system/components/media/camera-capture/camera-capture.frame";
import type {
  CameraCaptureProps,
  CameraCaptureSessionProps,
  CapturedMedia,
  CapturedMediaLocation,
} from "@/design-system/components/media/camera-capture/camera-capture.type";
import {
  CAMERA_FRAME_VARIANTS,
  capturePhoto,
  createCapturedMedia,
  DEFAULT_COMPRESS,
  formatDuration,
  getLocationOnce,
  isVideoRecordingSupported,
  pickVideoMimeType,
  revokePreview,
  videoFileFromChunks,
} from "@/design-system/components/media/camera-capture/camera-capture.utils";
import type { CameraFacingMode } from "@/design-system/components/media/camera/camera.type";
import { useCameraStream } from "@/design-system/components/media/camera/use-camera-stream";
import { P } from "@/design-system/components/typography/p/p";
import { Portal } from "@/design-system/components/utilities/portal/portal";
import { t } from "@/shared/libs/i18n";
import { useFieldContext } from "@chakra-ui/react";
import {
  CameraIcon,
  CameraOffIcon,
  CheckIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  SwitchCameraIcon,
  Trash2Icon,
  VideoIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// -------------------------------------------------------------------------------------
// Inline control
// -------------------------------------------------------------------------------------

/**
 * Camera-only file input: no gallery picker. Opens a fullscreen camera with an optional
 * guide (`frameVariant`), captures photos and short videos, lets the user retake or
 * delete each item, and returns them on "Selesai".
 *
 * Works with Field (label, helper and error text, invalid) and with react-hook-form
 * through `Controller` (value + onChange).
 */
export const CameraCapture = (props: CameraCaptureProps) => {
  // Props
  const {
    value: valueProp,
    onChange,
    accept = "image",
    multiple = false,
    maxFiles = 10,
    maxVideoDurationSec = 15,
    facingMode,
    allowSwitchCamera = true,
    frameVariant = "none",
    compress = DEFAULT_COMPRESS,
    withLocation = false,
    withHash = false,
    label,
    disabled: disabledProp,
    invalid: invalidProp,
  } = props;

  // Contexts
  const fieldContext = useFieldContext();

  // States
  const [internalItems, setInternalItems] = useState<CapturedMedia[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Derived Values
  const items = valueProp ?? internalItems;
  const maxItems = multiple ? Math.max(1, maxFiles) : 1;
  const disabled = disabledProp ?? fieldContext?.disabled ?? false;
  const invalid = invalidProp ?? fieldContext?.invalid ?? false;
  const initialFacing = facingMode ?? CAMERA_FRAME_VARIANTS[frameVariant].defaultFacing;
  const buttonLabel =
    label ??
    (accept === "video"
      ? t["camera_capture.record_video"]()
      : accept === "both"
        ? t["camera_capture.take_photo_or_video"]()
        : t["camera_capture.take_photo"]());

  // Handlers
  function commit(next: CapturedMedia[]) {
    // Previews of items that left the list are no longer needed
    items.filter((item) => !next.includes(item)).forEach(revokePreview);
    if (valueProp === undefined) setInternalItems(next);
    onChange?.(next);
  }

  return (
    <VStack w={"full"} gap={3} align={"stretch"}>
      {items.length > 0 && (
        <HStack as={"ul"} gap={2} wrap={"wrap"} listStyleType={"none"} p={0} m={0}>
          {items.map((item, index) => (
            <Box
              as={"li"}
              key={item.id}
              pos={"relative"}
              w={"88px"}
              h={"88px"}
              rounded={"md"}
              overflow={"hidden"}
              bg={"bg.subtle"}
            >
              <CapturedThumbnail item={item} index={index} />
              <IconButton
                size={"xs"}
                variant={"solid"}
                colorPalette={"gray"}
                pos={"absolute"}
                top={1}
                right={1}
                disabled={disabled}
                aria-label={t["camera_capture.remove_item"]({ index: String(index + 1) })}
                onClick={() => commit(items.filter((other) => other.id !== item.id))}
              >
                <AppIcon icon={XIcon} />
              </IconButton>
            </Box>
          ))}
        </HStack>
      )}

      <Button
        variant={"outline"}
        borderColor={invalid ? "border.error" : undefined}
        disabled={disabled || (multiple && items.length >= maxItems)}
        aria-invalid={invalid || undefined}
        onClick={() => setIsOpen(true)}
        alignSelf={"start"}
      >
        <AppIcon icon={accept === "video" ? VideoIcon : CameraIcon} />
        {buttonLabel}
      </Button>

      {isOpen && (
        <CameraCaptureSession
          accept={accept}
          maxVideoDurationSec={maxVideoDurationSec}
          allowSwitchCamera={allowSwitchCamera}
          frameVariant={frameVariant}
          compress={compress}
          withLocation={withLocation}
          withHash={withHash}
          initialItems={items}
          maxItems={maxItems}
          initialFacing={initialFacing}
          onDone={(next) => {
            commit(next);
            setIsOpen(false);
          }}
          onCancel={() => setIsOpen(false)}
        />
      )}
    </VStack>
  );
};

const CapturedThumbnail = (props: { item: CapturedMedia; index: number }) => {
  // Props
  const { item, index } = props;

  if (item.type === "video") {
    return (
      <video
        src={item.previewUrl}
        muted
        playsInline
        preload={"metadata"}
        aria-label={t["camera_capture.video_n"]({ index: String(index + 1) })}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }

  return (
    <img
      src={item.previewUrl}
      alt={t["camera_capture.photo_n"]({ index: String(index + 1) })}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
};

// -------------------------------------------------------------------------------------
// Fullscreen session
// -------------------------------------------------------------------------------------

const CameraCaptureSession = (props: CameraCaptureSessionProps) => {
  // Props
  const {
    accept,
    maxVideoDurationSec,
    allowSwitchCamera,
    frameVariant,
    compress,
    withLocation,
    withHash,
    initialItems,
    maxItems,
    initialFacing,
    onDone,
    onCancel,
  } = props;

  // States
  const [items, setItems] = useState<CapturedMedia[]>(initialItems);
  const [mode, setMode] = useState<"image" | "video">(accept === "video" ? "video" : "image");
  const [facing, setFacing] = useState<CameraFacingMode>(initialFacing);
  const [retakeId, setRetakeId] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number | null>(null);
  const [isConfirmingDiscard, setIsConfirmingDiscard] = useState(false);
  const [location, setLocation] = useState<CapturedMediaLocation | undefined>(undefined);

  // Hooks
  const { videoRef, stream, status, restart } = useCameraStream({
    enabled: true,
    facingMode: facing,
    audio: mode === "video",
  });

  // Refs
  const recorderRef = useRef<MediaRecorder | null>(null);
  const shutterRef = useRef<HTMLButtonElement>(null);

  // Derived Values
  const config = CAMERA_FRAME_VARIANTS[frameVariant];
  const newItems = items.filter((item) => !initialItems.includes(item));
  const isFull = items.length >= maxItems && retakeId === null && maxItems > 1;
  const isRecording = recordingSeconds !== null;
  const canRecord = isVideoRecordingSupported();
  const isMirrored = facing === "user";

  // Effects
  useEffect(() => {
    if (!withLocation) return;
    let cancelled = false;
    void getLocationOnce().then((fix) => {
      if (!cancelled) setLocation(fix);
    });
    return () => {
      cancelled = true;
    };
  }, [withLocation]);

  useEffect(() => {
    if (status === "active") shutterRef.current?.focus();
  }, [status]);

  // Stop a running recording if the session closes
  useEffect(
    () => () => {
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    },
    [],
  );

  // Handlers
  function addItem(item: CapturedMedia) {
    setItems((current) => {
      const target =
        retakeId ?? (maxItems === 1 && current.length > 0 ? current[0].id : null);
      if (target) {
        const replaced = current.find((other) => other.id === target);
        if (replaced && !initialItems.includes(replaced)) revokePreview(replaced);
        return current.map((other) => (other.id === target ? item : other));
      }
      return current.length < maxItems ? [...current, item] : current;
    });
    setRetakeId(null);
  }

  async function handlePhoto() {
    const video = videoRef.current;
    if (!video || isBusy || isFull) return;
    setIsBusy(true);
    try {
      const file = await capturePhoto(video, compress);
      addItem(await createCapturedMedia(file, "image", { location, withHash }));
    } finally {
      setIsBusy(false);
    }
  }

  function handleStartRecording() {
    if (!stream || isFull || !canRecord) return;
    const mimeType = pickVideoMimeType();
    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    const chunks: Blob[] = [];
    const startedAt = Date.now();
    const timer = setInterval(() => {
      const seconds = (Date.now() - startedAt) / 1000;
      setRecordingSeconds(seconds);
      if (seconds >= maxVideoDurationSec && recorder.state === "recording") recorder.stop();
    }, 250);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };
    recorder.onstop = () => {
      clearInterval(timer);
      setRecordingSeconds(null);
      recorderRef.current = null;
      if (chunks.length === 0) return;
      const file = videoFileFromChunks(chunks, recorder.mimeType || mimeType || "video/webm");
      void createCapturedMedia(file, "video", { location, withHash }).then(addItem);
    };

    recorderRef.current = recorder;
    recorder.start(250);
    setRecordingSeconds(0);
  }

  function handleStopRecording() {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }

  function handleDelete(item: CapturedMedia) {
    if (!initialItems.includes(item)) revokePreview(item);
    setItems((current) => current.filter((other) => other.id !== item.id));
    if (retakeId === item.id) setRetakeId(null);
  }

  function handleClose() {
    if (isRecording) return;
    if (newItems.length > 0) {
      setIsConfirmingDiscard(true);
      return;
    }
    onCancel();
  }

  function handleDiscard() {
    newItems.forEach(revokePreview);
    onCancel();
  }

  function handleShutter() {
    if (mode === "image") void handlePhoto();
    else if (isRecording) handleStopRecording();
    else handleStartRecording();
  }

  // Derived Values
  const hint = config.hintKey ? t[config.hintKey]() : null;
  const shutterLabel = (() => {
    if (mode === "video") {
      return isRecording
        ? t["camera_capture.stop_recording"]()
        : t["camera_capture.start_recording"]();
    }
    return retakeId ? t["camera_capture.retake_photo"]() : t["camera_capture.take_photo"]();
  })();
  const isBlocked = status === "permission-denied" || status === "unsupported" || status === "error";

  return (
    <Portal>
      <Box
        pos={"fixed"}
        inset={0}
        zIndex={"modal"}
        bg={"black"}
        color={"white"}
        role={"dialog"}
        aria-modal={"true"}
        aria-label={t["camera_capture.dialog_label"]()}
        onKeyDown={(event) => {
          if (event.key === "Escape") handleClose();
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: isMirrored ? "scaleX(-1)" : undefined,
          }}
        />

        {!isBlocked && <CameraFrameOverlay variant={frameVariant} />}

        {/* Top bar */}
        <HStack
          pos={"absolute"}
          top={0}
          left={0}
          right={0}
          px={3}
          pt={"calc(env(safe-area-inset-top) + 12px)"}
          pb={3}
          justify={"space-between"}
          align={"start"}
          gap={3}
          bg={"linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)"}
        >
          <IconButton
            variant={"ghost"}
            color={"white"}
            aria-label={t["camera_capture.close"]()}
            onClick={handleClose}
          >
            <AppIcon icon={XIcon} />
          </IconButton>

          {hint && (
            <P flex={1} textAlign={"center"} fontSize={"sm"} pt={2} aria-live={"polite"}>
              {hint}
            </P>
          )}

          {allowSwitchCamera && (
            <IconButton
              variant={"ghost"}
              color={"white"}
              disabled={isRecording}
              aria-label={t["camera_capture.switch_camera"]()}
              onClick={() => setFacing((current) => (current === "user" ? "environment" : "user"))}
            >
              <AppIcon icon={SwitchCameraIcon} />
            </IconButton>
          )}
        </HStack>

        {status === "requesting" && (
          <VStack pos={"absolute"} inset={0} justify={"center"} align={"center"}>
            <Loader size={"lg"} color={"white"} />
          </VStack>
        )}

        {isBlocked && (
          <VStack pos={"absolute"} inset={0} p={6} gap={3} justify={"center"} align={"center"} textAlign={"center"}>
            <AppIcon icon={CameraOffIcon} boxSize={8} />
            <P fontWeight={"semibold"}>
              {status === "permission-denied"
                ? t["qr_scanner.permission_denied_title"]()
                : status === "unsupported"
                  ? t["qr_scanner.unsupported_title"]()
                  : t["qr_scanner.error_title"]()}
            </P>
            <P fontSize={"sm"} color={"whiteAlpha.800"} maxW={"300px"}>
              {status === "permission-denied"
                ? t["qr_scanner.permission_denied_description"]()
                : status === "unsupported"
                  ? t["camera_capture.unsupported_description"]()
                  : t["qr_scanner.error_description"]()}
            </P>
            {status !== "unsupported" && (
              <Button onClick={restart}>{t["qr_scanner.retry"]()}</Button>
            )}
          </VStack>
        )}

        {/* Bottom: preview strip, mode, shutter, done */}
        <VStack
          pos={"absolute"}
          left={0}
          right={0}
          bottom={0}
          px={4}
          pt={6}
          pb={"calc(env(safe-area-inset-bottom) + 16px)"}
          gap={4}
          bg={"linear-gradient(to top, rgba(0,0,0,0.75), transparent)"}
        >
          {isConfirmingDiscard && (
            <HStack
              role={"alertdialog"}
              aria-label={t["camera_capture.discard_title"]({ count: String(newItems.length) })}
              w={"full"}
              maxW={"420px"}
              p={3}
              gap={3}
              rounded={"lg"}
              bg={"bg.panel"}
              color={"fg"}
              justify={"space-between"}
            >
              <P fontSize={"sm"} fontWeight={"medium"}>
                {t["camera_capture.discard_title"]({ count: String(newItems.length) })}
              </P>
              <HStack gap={2}>
                <Button size={"sm"} variant={"ghost"} onClick={handleDiscard}>
                  {t["camera_capture.discard"]()}
                </Button>
                <Button size={"sm"} onClick={() => onDone(items)}>
                  {t["camera_capture.keep"]()}
                </Button>
              </HStack>
            </HStack>
          )}

          {items.length > 0 && (
            <HStack as={"ul"} gap={2} w={"full"} overflowX={"auto"} listStyleType={"none"} p={0} m={0} justify={"center"}>
              {items.map((item, index) => {
                const isRetake = retakeId === item.id;
                return (
                  <VStack as={"li"} key={item.id} gap={1} flexShrink={0}>
                    <Box
                      w={"64px"}
                      h={"64px"}
                      rounded={"md"}
                      overflow={"hidden"}
                      outline={isRetake ? "3px solid" : undefined}
                      outlineColor={"yellow.400"}
                    >
                      <CapturedThumbnail item={item} index={index} />
                    </Box>
                    <HStack gap={1}>
                      <IconButton
                        size={"xs"}
                        variant={"solid"}
                        colorPalette={"gray"}
                        aria-pressed={isRetake}
                        aria-label={t["camera_capture.retake_item"]({ index: String(index + 1) })}
                        onClick={() => setRetakeId(isRetake ? null : item.id)}
                      >
                        <AppIcon icon={RotateCcwIcon} />
                      </IconButton>
                      <IconButton
                        size={"xs"}
                        variant={"solid"}
                        colorPalette={"gray"}
                        aria-label={t["camera_capture.remove_item"]({ index: String(index + 1) })}
                        onClick={() => handleDelete(item)}
                      >
                        <AppIcon icon={Trash2Icon} />
                      </IconButton>
                    </HStack>
                  </VStack>
                );
              })}
            </HStack>
          )}

          {accept === "both" && canRecord && !isRecording && (
            <HStack gap={1} p={1} rounded={"full"} bg={"blackAlpha.600"} role={"radiogroup"} aria-label={t["camera_capture.mode"]()}>
              <Button
                size={"sm"}
                rounded={"full"}
                variant={mode === "image" ? "solid" : "ghost"}
                color={mode === "image" ? undefined : "white"}
                role={"radio"}
                aria-checked={mode === "image"}
                onClick={() => setMode("image")}
              >
                {t["camera_capture.mode_photo"]()}
              </Button>
              <Button
                size={"sm"}
                rounded={"full"}
                variant={mode === "video" ? "solid" : "ghost"}
                color={mode === "video" ? undefined : "white"}
                role={"radio"}
                aria-checked={mode === "video"}
                onClick={() => setMode("video")}
              >
                {t["camera_capture.mode_video"]()}
              </Button>
            </HStack>
          )}

          {isRecording && (
            <P role={"timer"} aria-live={"off"} fontFamily={"number"} fontWeight={"semibold"} color={"red.300"}>
              {`${formatDuration(recordingSeconds ?? 0)} / ${formatDuration(maxVideoDurationSec)}`}
            </P>
          )}

          <HStack w={"full"} maxW={"420px"} justify={"space-between"} align={"center"}>
            <Box w={"96px"}>
              {isFull && (
                <P fontSize={"xs"} color={"whiteAlpha.800"}>
                  {t["camera_capture.max_reached"]({ max: String(maxItems) })}
                </P>
              )}
            </Box>

            {/* Shutter */}
            <Box
              asChild
              w={"72px"}
              h={"72px"}
              rounded={"full"}
              border={"4px solid white"}
              bg={mode === "video" ? "red.500" : "whiteAlpha.300"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              cursor={"pointer"}
              _disabled={{ opacity: 0.4, cursor: "not-allowed" }}
              _focusVisible={{ outline: "3px solid", outlineColor: "yellow.400", outlineOffset: "3px" }}
            >
              <button
                ref={shutterRef}
                type={"button"}
                disabled={status !== "active" || isBusy || (isFull && !isRecording)}
                aria-label={shutterLabel}
                onClick={handleShutter}
              >
                {isRecording && <Box w={"24px"} h={"24px"} rounded={"sm"} bg={"white"} />}
                {retakeId && !isRecording && <AppIcon icon={RefreshCwIcon} boxSize={7} />}
              </button>
            </Box>

            <Box w={"96px"} display={"flex"} justifyContent={"end"}>
              <Button
                disabled={items.length === 0 || isRecording}
                onClick={() => onDone(items)}
              >
                <AppIcon icon={CheckIcon} />
                {t["camera_capture.done"]({ count: String(items.length) })}
              </Button>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Portal>
  );
};
