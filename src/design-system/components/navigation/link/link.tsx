// src/design-system/components/navigation/link/link.tsx

import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import type {
  ExternalLinkProps,
  NavLinkProps,
} from "@/design-system/components/navigation/link/link.type";
import { P } from "@/design-system/components/typography/p/p";
import { t } from "@/shared/libs/i18n";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as TanstackLink, useNavigate } from "@tanstack/react-router";
import { LinkBreakIcon as Link2OffIcon } from "@phosphor-icons/react";
import { cloneElement, forwardRef, isValidElement } from "react";

export const NavLink = forwardRef<
  HTMLAnchorElement,
  NavLinkProps & { asChild?: boolean }
>(function NavLink(props, ref) {
  // Props
  const { asChild, children, to, params, search, hash, replace, ...restProps } =
    props;

  // Hooks
  const navigate = useNavigate();

  if (asChild && isValidElement(children)) {
    const childProps = children.props as {
      onClick?: (e: React.MouseEvent) => void;
    };

    return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      onClick: (e: React.MouseEvent) => {
        childProps.onClick?.(e);
        if (!e.defaultPrevented && to) {
          void navigate({ to, params, search, hash, replace } as Parameters<
            typeof navigate
          >[0]);
        }
      },
    });
  }

  return (
    <TanstackLink
      ref={ref}
      to={to}
      params={params}
      search={search}
      hash={hash}
      replace={replace}
      {...restProps}
    >
      {children}
    </TanstackLink>
  );
});

export const ExternalLink = forwardRef<
  HTMLAnchorElement,
  ExternalLinkProps & { asChild?: boolean }
>(function ExternalLink(props, ref) {
  // Props
  const {
    variant = "underline",
    _hover,
    href,
    asChild,
    children,
    onClick,
    ...restProps
  } = props;

  if (!href) {
    return (
      <HStack align={"center"} gap={2}>
        <AppIcon
          icon={Link2OffIcon}
          color={"fg.muted"}
          size={restProps.iconSize}
        />

        <P
          color={"fg.muted"}
          textDecoration={"line-through"}
          fontSize={restProps.fontSize}
          fontWeight={restProps.fontWeight}
        >
          {t["common.link_not_found"]()}
        </P>
      </HStack>
    );
  }

  if (asChild && isValidElement(children)) {
    const childProps = children.props as {
      onClick?: (e: React.MouseEvent) => void;
    };

    return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      onClick: (e: React.MouseEvent) => {
        childProps.onClick?.(e);
        (onClick as ((e: React.MouseEvent<HTMLAnchorElement>) => void) | undefined)?.(
          e as React.MouseEvent<HTMLAnchorElement>,
        );
        if (!e.defaultPrevented) {
          window.open(href, "_blank", "noopener,noreferrer");
        }
      },
    });
  }

  return (
    <ChakraLink
      ref={ref}
      href={href ?? undefined}
      target={"_blank"}
      onClick={onClick}
      _hover={
        variant === "underline"
          ? {
              textDecor: "underline",
              ..._hover,
            }
          : {
              textDecor: "none",
              ..._hover,
            }
      }
      {...restProps}
    >
      {children}
    </ChakraLink>
  );
});
