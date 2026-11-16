// src/design-system/components/feedback/ui/skeleton.tsx

"use client";

import type {
  SkeletonCircleProps,
  SkeletonProps,
  SkeletonTextProps,
} from "@/design-system/components/feedback/skeleton/skeleton.type";
import { Center } from "@/design-system/components/layout/center/center";
import { useThemeStore } from "@/design-system/stores/theme-store";
import {
  Skeleton as ChakraSkeleton,
  SkeletonCircle as ChakraSkeletonCircle,
  SkeletonText as ChakraSkeletonText,
} from "@chakra-ui/react";

const shineAnimationProps = {
  "--animate-from": "-100%",
  "--animate-to": "100%",
  backgroundImage: {
    _light:
      "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 50%, transparent 100%)",
    _dark:
      "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)",
  },
  backgroundSize: "200% 100%",
  backgroundRepeat: "no-repeat",
  animation: "bg-position 1.5s ease-in-out infinite",
};

export const Skeleton = (props: SkeletonProps) => {
  // Props
  const { loading, loaded, children, variant = "shine", ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  const isLoaded =
    loaded !== undefined
      ? loaded
      : loading !== undefined
        ? !loading
        : undefined;

  // If used as a loaded container and content is loaded, render children
  if (isLoaded === true && children) {
    return <>{children}</>;
  }

  // If wrapping children while still loading, use ChakraSkeleton as wrapper
  if (children) {
    return (
      <Center
        w={"full"}
        h={"full"}
        bg={"bg.body"}
        rounded={theme.radii.container}
        overflow={"clip"}
        {...restProps}
      >
        <ChakraSkeleton
          loading={isLoaded !== undefined ? !isLoaded : true}
          variant={variant}
          w={"full"}
          h={"full"}
          bg={"an1"}
          rounded={theme.radii.container}
          {...(variant === "shine" ? shineAnimationProps : {})}
        >
          {children}
        </ChakraSkeleton>
      </Center>
    );
  }

  return (
    <Center
      w={"full"}
      h={"full"}
      bg={"bg.body"}
      rounded={theme.radii.container}
      overflow={"clip"}
      {...restProps}
    >
      <ChakraSkeleton
        variant={variant}
        w={"full"}
        h={"full"}
        bg={"an1"}
        rounded={theme.radii.container}
        {...(variant === "shine" ? shineAnimationProps : {})}
      />
    </Center>
  );
};

export const SkeletonCircle = (props: SkeletonCircleProps) => {
  return (
    <ChakraSkeletonCircle
      variant={"shine"}
      bg={"an1"}
      {...shineAnimationProps}
      {...props}
    />
  );
};

export const SkeletonText = (props: SkeletonTextProps) => {
  return (
    <ChakraSkeletonText
      variant={"shine"}
      bg={"an1"}
      {...shineAnimationProps}
      {...props}
    />
  );
};
