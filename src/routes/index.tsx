// src/routes/index.tsx

import { Logo } from "@/design-system/components/branding/logo/logo";
import { Button } from "@/design-system/components/button/button/button";
import { Center } from "@/design-system/components/layout/center/center";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { NavLink } from "@/design-system/components/navigation/link/link";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Center minH={"100dvh"} p={6}>
      <VStack gap={4} align={"center"} textAlign={"center"}>
        <Logo boxSize={24} />
        <Heading size={"2xl"}>{"Exium Design System"}</Heading>
        <P color={"fg.muted"} maxW={"420px"}>
          {"Dokumentasi komponen UI, design tokens, dan pola antarmuka Exium."}
        </P>

        <NavLink to={"/design-system/ui"} asChild={true}>
          <Button primary={true} size={"lg"} bouncy={true}>
            {"Design System UI"}
          </Button>
        </NavLink>
      </VStack>
    </Center>
  );
}
