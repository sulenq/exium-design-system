// src/features/design-system-docs/components/foundation/hook-docs.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import type { DsNavKey } from "@/features/design-system-docs/types/ds-docs-navs.type";

const HOOKS_SPECS_MAP: Record<
  string,
  { title: string; description: string; usage: string; returns: string }
> = {
  use_disclosure: {
    title: "useDisclosure",
    description: "Manage boolean open/closed state with toggle, open, and close callbacks.",
    usage: `import { useDisclosure } from "@chakra-ui/react";

const { open, onOpen, onClose, onToggle } = useDisclosure();`,
    returns: "{ open: boolean, onOpen: () => void, onClose: () => void, onToggle: () => void }",
  },
  use_media_query: {
    title: "useMediaQuery",
    description: "Listen for responsive CSS media query matches reactively.",
    usage: `import { useMediaQuery } from "@chakra-ui/react";

const [isLarge] = useMediaQuery("(min-width: 960px)");`,
    returns: "boolean[]",
  },
  use_viewport_mode: {
    title: "useViewportMode",
    description: "Check whether current viewport is small/mobile or desktop mode.",
    usage: `import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";

const isSmall = useIsSmallViewport();`,
    returns: "boolean",
  },
  use_url_overlay: {
    title: "useUrlOverlay (usePopModal)",
    description: "Synchronize modal, dialog, and drawer states with URL search params (activeModalKey) for browser back-button dismissal.",
    usage: `import { usePopModal } from "@/design-system/components/overlay/hooks/use-pop-modal";

const modal = usePopModal({ modalKey: "profile-modal" });
// modal.isOpen, modal.open(), modal.close()`,
    returns: "{ isOpen: boolean, open: () => void, close: () => void }",
  },
  use_master_detail_nav: {
    title: "useMasterDetailNav",
    description: "Coordinates master list and detail overlay panels across responsive viewports.",
    usage: `import { useSearch, useNavigate } from "@tanstack/react-router";

// Coordinates selection state via router search params`,
    returns: "Navigation state & handlers",
  },
  use_controllable_state: {
    title: "useControllableState",
    description: "Manage state that can be either controlled or uncontrolled.",
    usage: `import { useControllableState } from "@chakra-ui/react";

const [val, setVal] = useControllableState({
  value: props.value,
  defaultValue: "default",
  onChange: props.onChange,
});`,
    returns: "[T, (next: T) => void]",
  },
  use_debounce: {
    title: "useDebounce (useDebouncedValue)",
    description: "Delay updating a value until user input pauses.",
    usage: `import { useDebouncedValue } from "@/design-system/hooks/use-debounced-value";

const debouncedQuery = useDebouncedValue(searchQuery, 300);`,
    returns: "Debounced value",
  },
  use_copy_to_clipboard: {
    title: "useCopyToClipboard",
    description: "Copy text to clipboard with ephemeral success status.",
    usage: `// Uses navigator.clipboard.writeText with copied feedback timeout`,
    returns: "{ copied: boolean, copy: (text: string) => Promise<void> }",
  },
  use_is_mounted: {
    title: "useIsMounted",
    description: "Check if component is currently mounted to prevent memory leaks on unmounted state updates.",
    usage: `import { useMountTimeout } from "@/design-system/hooks/use-mount-timeout";

const isMounted = useMountTimeout(0);`,
    returns: "boolean",
  },
  use_event_listener: {
    title: "useEventListener (useClickOutside)",
    description: "Listen to document or window events with auto-cleanup on unmount.",
    usage: `import { useClickOutside } from "@/design-system/hooks/use-click-outside";

useClickOutside(ref, () => handleClose());`,
    returns: "void",
  },
  use_hotkeys: {
    title: "useHotkeys",
    description: "Bind keyboard shortcuts (e.g. Mod+K for search) with accessibility focus trapping.",
    usage: `import { useFocusSearch } from "@/design-system/hooks/use-focus-search";

useFocusSearch(inputRef); // Focuses input on '/' or hotkey`,
    returns: "void",
  },
};

export const HookDocs = ({ navKey }: { navKey: DsNavKey }) => {
  const spec = HOOKS_SPECS_MAP[navKey] ?? {
    title: navKey,
    description: "Design system hook reference.",
    usage: `// Hook: ${navKey}`,
    returns: "unknown",
  };

  return (
    <VStack align={"stretch"} gap={6} w={"full"}>
      <VStack align={"start"} gap={2}>
        <HStack gap={2} align={"center"}>
          <P fontSize={"3xl"} fontWeight={"bold"}>
            {spec.title}
          </P>
          <Badge variant={"subtle"}>{"Hook"}</Badge>
        </HStack>
        <P color={"fg.muted"}>{spec.description}</P>
      </VStack>

      <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
        <P fontWeight={"bold"} mb={2}>
          {"Usage Example"}
        </P>
        <CodeBlock code={spec.usage} language={"tsx"} />
      </Box>

      <Box p={4} rounded={"lg"} border={"1px solid"} borderColor={"border.subtle"} bg={"bg.body"}>
        <P fontWeight={"bold"} mb={1}>
          {"Return Value"}
        </P>
        <P fontSize={"sm"} fontFamily={"mono"} color={"blue.fg"}>
          {spec.returns}
        </P>
      </Box>
    </VStack>
  );
};
