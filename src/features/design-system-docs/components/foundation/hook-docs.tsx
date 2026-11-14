// src/features/design-system-docs/components/foundation/hook-docs.tsx

import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { CodeBlock } from "@/features/design-system-docs/components/code-block";
import { FoundationHeader } from "@/features/design-system-docs/components/foundation/foundation-header";
import type { HookDocSpec, HookDocsProps } from "@/features/design-system-docs/types/hook-docs.type";

const HOOKS_SPECS_MAP: Record<string, HookDocSpec> = {
  use_disclosure: {
    title: "useDisclosure",
    description: "Manage boolean open/closed state with toggle, open, and close callbacks.",
    usage: `import { useDisclosure } from "@/design-system/hooks";

const { open, onOpen, onClose, onToggle } = useDisclosure();`,
    returns: "{ open: boolean, onOpen: () => void, onClose: () => void, onToggle: () => void }",
  },
  use_pop_disclosure: {
    title: "usePopDisclosure",
    description: "Synchronize modal, dialog, drawer, and focus-alert states with URL search params (overlay) for browser back-button dismissal and multi-depth navigation.",
    usage: `import { usePopDisclosure } from "@/design-system/components/overlay/hooks/use-pop-disclosure";

// Basic usage
const { modalKey, isOpen, open, close, toggle, activeKey, isKeyOpen } = usePopDisclosure({
  modalKey: "profile-modal",
  depth: 1,
});

// Nested overlay navigation with dot separator
open("edit"); // sets ?overlay=profile-modal.edit
const isEditOpen = isKeyOpen("profile-modal.edit");`,
    returns: "{ modalKey: string, isOpen: boolean, activeKey?: string, open: (subKey?: string) => void, close: () => void, toggle: () => void, isKeyOpen: (key: string) => boolean, depth?: number }",
  },
  use_color_mode: {
    title: "useColorMode",
    description: "Read and toggle between light and dark color modes reactively.",
    usage: `import { useColorMode, useColorModeValue } from "@/design-system/hooks/use-color-mode";

const { colorMode, toggleColorMode } = useColorMode();
const bg = useColorModeValue("white", "black");`,
    returns: "{ colorMode: 'light' | 'dark', setColorMode: (mode) => void, toggleColorMode: () => void }",
  },
  use_is_small_viewport: {
    title: "useIsSmallViewport",
    description: "Determine whether the current viewport is mobile/small viewport based on the design system layout breakpoint.",
    usage: `import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";

const isSmall = useIsSmallViewport();`,
    returns: "boolean",
  },
  use_viewport: {
    title: "useViewport",
    description: "Responsive viewport dimensions, orientation, and responsive breakpoint match checks.",
    usage: `import { useViewport } from "@/design-system/hooks/use-viewport";

const { width, height, isMobile, isTablet, isDesktop } = useViewport();`,
    returns: "ViewportState",
  },
  use_debounced_value: {
    title: "useDebouncedValue",
    description: "Delay updating a rapidly changing value (e.g. search keyword) until the specified delay in milliseconds has elapsed.",
    usage: `import { useDebouncedValue } from "@/design-system/hooks/use-debounced-value";

const debouncedQuery = useDebouncedValue(searchQuery, 300);`,
    returns: "T (debounced value)",
  },
  use_click_outside: {
    title: "useClickOutside",
    description: "Listen for clicks or taps outside a referenced container element and trigger a dismiss callback.",
    usage: `import { useClickOutside } from "@/design-system/hooks/use-click-outside";

const containerRef = useRef<HTMLDivElement>(null);
useClickOutside(containerRef, () => {
  setIsOpen(false);
});`,
    returns: "void",
  },
  use_is_mounted: {
    title: "useIsMounted",
    description: "Check if component is mounted or delayed-mount to safely avoid React memory leaks or coordinate entrance transitions.",
    usage: `import { useIsMounted } from "@/design-system/hooks/use-is-mounted";

const isMounted = useIsMounted({ mountDelay: 50 });`,
    returns: "boolean",
  },
  use_focus_search: {
    title: "useFocusSearch",
    description: "Bind search hotkeys (e.g. '/' or 'Cmd+K') to automatically focus the search input field.",
    usage: `import { useFocusSearch } from "@/design-system/hooks/use-focus-search";

const inputRef = useRef<HTMLInputElement>(null);
useFocusSearch(inputRef);`,
    returns: "void",
  },
  use_merged_refs: {
    title: "useMergedRefs",
    description: "Combine multiple React refs (forwarded ref, local ref, measure ref) into a single unified ref callback.",
    usage: `import { useMergedRefs } from "@/design-system/hooks/use-merge-refs";

const mergedRef = useMergedRefs({ refs: [localRef, forwardedRef] });`,
    returns: "RefCallback<T>",
  },
  use_ref_dimension: {
    title: "useRefDimension",
    description: "Real-time element bounding dimension tracking with ResizeObserver and requestAnimationFrame throttling.",
    usage: `import { useRefDimension } from "@/design-system/hooks/use-ref-dimension";

const { width, height } = useRefDimension(containerRef);`,
    returns: "{ width: number, height: number }",
  },
  use_search_param: {
    title: "useSearchParam",
    description: "Direct URL search query parameter accessor and updater synchronized with the router state.",
    usage: `import { useSearchParam } from "@/design-system/hooks/use-search-param";

const [tab, setTab] = useSearchParam("tab");`,
    returns: "[string | undefined, (value: string | undefined) => void]",
  },
  use_search_input: {
    title: "useSearchInput",
    description: "Complete search input controller hook combining query state, debouncing, and list filtering.",
    usage: `import { useSearchInput } from "@/design-system/hooks/use-search-input";

const { query, setQuery, filteredItems } = useSearchInput({
  items,
  filterFn: (item, q) => item.name.includes(q),
});`,
    returns: "SearchInputController<T>",
  },
  use_persisted_state: {
    title: "usePersistedState",
    description: "Generic persistent state hook with arbitrary key support, typed storage (localStorage / sessionStorage), and optional cross-tab synchronization.",
    usage: `import { usePersistedState } from "@/design-system/hooks/use-persisted-state";

// 1. Primitive state (boolean, string, number, dll) dengan key bebas
const [isOpen, setIsOpen] = usePersistedState<boolean>("app-drawer-open", true);

// 2. Object state kompleks dengan key bebas
type FilterState = { category: string; page: number };
const [filter, setFilter] = usePersistedState<FilterState>("table-filter", {
  category: "all",
  page: 1,
});

// 3. Update state via value langsung atau function updater
setIsOpen(false);
setFilter((prev) => ({ ...prev, page: prev.page + 1 }));`,
    returns: "[T, (value: T | ((prev: T) => T)) => void, () => void]",
  },
};

export const HookDocs = (props: HookDocsProps) => {
  const { navKey } = props;
  const spec = HOOKS_SPECS_MAP[navKey] ?? {
    title: navKey,
    description: "Design system hook reference.",
    usage: `// Hook: ${navKey}`,
    returns: "unknown",
  };

  return (
    <VStack gap={"lg"}>
      <FoundationHeader
        title={spec.title}
        badge={"Hook"}
        description={spec.description}
      />

      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
      >
        <VStack gap={"sm"} p={"md"}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"Usage Example"}
          </Heading>
          <CodeBlock code={spec.usage} language={"tsx"} />
        </VStack>
      </Box>

      <Box
        rounded={"lg"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        bg={"bg.body"}
      >
        <VStack gap={"xs"} p={"md"}>
          <Heading size={"sm"} fontWeight={"bold"}>
            {"Return Value"}
          </Heading>
          <P fontSize={"sm"} fontFamily={"mono"} color={"blue.fg"}>
            {spec.returns}
          </P>
        </VStack>
      </Box>
    </VStack>
  );
};
