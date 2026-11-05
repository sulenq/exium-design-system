// src/features/branding/components/ui/features-carousel.tsx

"use client";

import { Logo } from "@/design-system/components/branding/ui/logo";
import { Carousel } from "@/design-system/components/disclosure/ui/carousel";
import { AppIcon } from "@/design-system/components/icon/ui/app-icon";
import { Box } from "@/design-system/components/layout/ui/box";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { Image } from "@/design-system/components/media/ui/image";
import { P } from "@/design-system/components/typography/ui/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import type { FeaturesCarouselProps } from "@/features/branding/types/branding.type";
import { PATH_CONFIG } from "@/shared/constants/paths";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const CAROUSEL_ITEMS_LIST = [
  {
    image: `${PATH_CONFIG.images}/signin_carousel/1.png`,
    title: "World-Class Design System",
    description:
      "Exium provides a comprehensive token engine, highly crafted accessible components, fluid typography, and harmonious aesthetic color palettes.",
  },
  {
    image: `${PATH_CONFIG.images}/signin_carousel/2.png`,
    title: "Interactive Components",
    description:
      "Rich interactive documentation and playgrounds for data display, forms, overlays, navigation, and feedback states with instant live updates.",
  },
  {
    image: `${PATH_CONFIG.images}/signin_carousel/3.png`,
    title: "First-Class GIS & Map Shell",
    description:
      "High performance MapLibre integration featuring dynamic vector & raster layers, symbology styling, drawing tools, and camera controls.",
  },
  {
    image: `${PATH_CONFIG.images}/signin_carousel/4.png`,
    title: "Uncompromising Accessibility & DX",
    description:
      "Fully typed with TypeScript, strict design system protocols, keyboard navigation, and seamless light/dark modes for state-of-the-art UI.",
  },
];

export const FeaturesCarousel = (props: FeaturesCarouselProps) => {
  // Props
  const { ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <VStack
      p={[4, null, 6]}
      rounded={theme.radii.container}
      bg={`${theme.colorPalette}.solid`}
      pos={"relative"}
      {...restProps}
    >
      <Box pos={"absolute"} top={"0"} right={"0"} p={6}>
        <Box overflow={"hidden"}>
          <Logo
            boxSize={280}
            opacity={0.08}
            color={"#ffffff"}
            pointerEvents={"none"}
            mt={"-40px"}
            mr={"-40px"}
          />
        </Box>
      </Box>


      <Carousel.Root
        defaultPage={0}
        loop
        autoplay={{
          delay: 6000,
        }}
        slideCount={CAROUSEL_ITEMS_LIST.length}
        flex={1}
        gap={4}
        pos={"relative"}
      >
        <Carousel.Control flex={1} gap={[4, null, 6]}>
          <Carousel.ItemGroup
            w={"full"}
            flex={1}
            rounded={theme.radii.container}
            bg={"whiteAlpha.200"}
          >
            {CAROUSEL_ITEMS_LIST.map((carousel, index) => (
              <Carousel.Item
                key={index}
                index={index}
                flex={1}
                gap={4}
                p={[4, null, 6]}
                color={"white"}
                overflow={"clip"}
                justifyContent={"center"}
              >
                <Image
                  src={carousel.image}
                  alt={`Image ${index + 1}`}
                  objectFit={"contain"}
                  w={"full"}
                  aspectRatio={16 / 10}
                />

                <VStack gap={"sm"} mt={"md"}>
                  <P
                    fontSize={"xl"}
                    fontWeight={"semibold"}
                    textAlign={"center"}
                  >
                    {carousel.title}
                  </P>

                  <P textAlign={"center"} mt={"auto"}>
                    {carousel.description}
                  </P>
                </VStack>
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>

          <HStack align={"center"} gap={4} w={"full"}>
            <Carousel.PrevTrigger asChild>
              <Carousel.ActionButton
                color={"white"}
                borderColor={"white"}
                _hover={{
                  bg: "an1",
                }}
              >
                <AppIcon icon={ArrowLeftIcon} />
              </Carousel.ActionButton>
            </Carousel.PrevTrigger>

            <Box w={"full"}>
              <Carousel.Indicators
                bg={"bodyLight"}
                boxSize={1.5}
                transition={"200ms"}
                transformOrigin={"center"}
                w={"full"}
                _current={{
                  opacity: 1,
                }}
              />
            </Box>

            <Carousel.NextTrigger asChild>
              <Carousel.ActionButton
                color={"white"}
                borderColor={"white"}
                _hover={{
                  bg: "an1",
                }}
              >
                <AppIcon icon={ArrowRightIcon} />
              </Carousel.ActionButton>
            </Carousel.NextTrigger>
          </HStack>
        </Carousel.Control>
      </Carousel.Root>
    </VStack>
  );
};
