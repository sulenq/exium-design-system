// src/routes/index.tsx

import { Button } from "@/design-system/components/button/button/button";
import { Logo } from "@/design-system/components/branding/logo/logo";
import { Center } from "@/design-system/components/layout/center/center";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Center minH={"100dvh"} p={6}>
      <VStack gap={4} align={"center"} textAlign={"center"}>
        <Logo boxSize={12} />
        <Heading size={"2xl"}>{"Exium Design System"}</Heading>
        <P color={"fg.muted"} maxW={"420px"}>
          {"Dokumentasi komponen UI, design tokens, dan pola antarmuka Exium."}
        </P>
        <Button asChild={true} primary={true} size={"lg"}>
          <Link to={"/design-system/ui"}>{"Buka Design System UI"}</Link>
        </Button>
      </VStack>
    </Center>
  );
}
