// src/features/design-system-v2-docs/components/ds-docs-sidebar.tsx

import { Box } from "@/design-system/components/layout/ui/box";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { P } from "@/design-system/components/typography/ui/p";
import { DS_V2_NAV_GROUPS } from "@/features/design-system-v2-docs/constants/ds.nav-groups";
import { Link } from "@tanstack/react-router";

export const DsDocsSidebar = ({ activeId }: { activeId: string }) => {
  return (
    <VStack
      align={"stretch"}
      w={"240px"}
      h={"full"}
      py={4}
      px={2}
      gap={4}
      overflowY={"auto"}
      borderRight={"1px solid"}
      borderColor={"border.subtle"}
    >
      <Box px={2} pb={2} borderBottom={"1px solid"} borderColor={"border.subtle"}>
        <P fontWeight={"bold"} fontSize={"lg"}>
          {"Exium DS v2"}
        </P>
        <P fontSize={"xs"} color={"fg.muted"}>
          {"shadcn/ui + Tailwind v4"}
        </P>
      </Box>

      {DS_V2_NAV_GROUPS.map((group) => (
        <VStack key={group.category} align={"stretch"} gap={1}>
          <P
            fontSize={"xs"}
            fontWeight={"bold"}
            color={"fg.subtle"}
            px={2}
            py={1}
            textTransform={"uppercase"}
            letterSpacing={"wider"}
          >
            {group.category}
          </P>

          {group.items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.id}
                to={"/design-system-v2/ui"}
                search={{ component: item.id }}
                style={{ textDecoration: "none" }}
              >
                <HStack
                  px={3}
                  py={1.5}
                  rounded={"md"}
                  bg={isActive ? "bg.subtle" : "transparent"}
                  color={isActive ? "colorPalette.fg" : "fg"}
                  fontWeight={isActive ? "bold" : "normal"}
                  fontSize={"sm"}
                  cursor={"pointer"}
                  _hover={{ bg: "bg.muted" }}
                >
                  <P>{item.label}</P>
                </HStack>
              </Link>
            );
          })}
        </VStack>
      ))}
    </VStack>
  );
};

