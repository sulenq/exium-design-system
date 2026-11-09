// src/features/auth/components/ui/signin-shell.tsx

import { Logo } from "@/design-system/components/branding/logo/logo";
import { OutlineContourPerspective } from "@/design-system/components/decorative/outline-contour-perspective/outline-contour-perspective";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { PageContainer } from "@/design-system/components/layout/page-container/page-container";
import { P, PSerif } from "@/design-system/components/typography/p/p";
import { APP_CONFIG } from "@/design-system/constants/_meta";
import { useThemeStore } from "@/design-system/stores/theme-store";
import type { SigninShellProps } from "@/features/auth/types/signin.type";
import { FeaturesCarousel } from "@/features/branding/components/ui/features-carousel";

export const SigninShell = (props: SigninShellProps) => {
  // Props
  const { intro, children } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <PageContainer p={[2, 4, 6]} pos={"relative"}>
      <OutlineContourPerspective
        pos={"absolute"}
        left={0}
        bottom={0}
        w={"full"}
        h={"500px"}
        opacity={0.1}
      />

      <SimpleGrid
        columns={[1, null, 2]}
        overflow={"clip"}
        w={"full"}
        maxW={"1200px"}
        minH={[null, null, "720px"]}
        m={"auto"}
        bg={"bg.body"}
        rounded={theme.radii.container}
      >
        <FeaturesCarousel h={"full"} />

        <VStack
          overflowY={"auto"}
          maxW={"450px"}
          h={"full"}
          mx={"auto"}
          py={[8, 10, 12]}
          justify={"center"}
        >
          {intro ?? (
            <HStack align={"center"} justify={"center"} gap={4}>
              <Logo boxSize={24} />

              <VStack align={"start"} gap={"2xs"}>
                <P fontSize={"md"} fontWeight={"semibold"} lineHeight={1.2}>
                  {APP_CONFIG.title}
                </P>

                <PSerif fontSize={"xs"} color={"fg.muted"} lineHeight={1.2}>
                  {"Next-Gen Modern UI & Token System"}
                </PSerif>
              </VStack>
            </HStack>
          )}

          {children}
        </VStack>
      </SimpleGrid>
    </PageContainer>
  );
};
