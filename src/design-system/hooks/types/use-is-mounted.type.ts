// src/design-system/hooks/types/use-is-mounted.type.ts

export type UseIsMountedOptions = {
  isOpen?: boolean;
  mountDelay?: number;
  unmountDelay?: number;
};

// Deprecated alias for backwards compatibility
export type UseMountTimeoutOptions = UseIsMountedOptions;
