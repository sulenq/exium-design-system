import { Button } from "@/design-system/components/button/button/button";
import { Accordion } from "@/design-system/components/disclosure/accordion/accordion";
import { Carousel } from "@/design-system/components/disclosure/carousel/carousel";
import { Collapsible } from "@/design-system/components/disclosure/collapsible/collapsible";
import { Steps } from "@/design-system/components/disclosure/steps/steps";
import { Tabs } from "@/design-system/components/disclosure/tabs/tabs";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Image } from "@/design-system/components/media/image/image";
import { P } from "@/design-system/components/typography/p/p";
import { Span } from "@/design-system/components/typography/span/span";
import { COLOR_PALETTE_OPTIONS } from "@/design-system/constants/colors";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

export const DISCLOSURE_DOCS: Record<string, ComponentDocSpec> = {

  accordion: {
    key: "accordion",
    title: "Accordion",
    category: "Disclosure",
    description:
      "Komponen panel lipat collapsible berlapis untuk menghemat ruang vertikal.",
    importPath:
      'import { Accordion } from "@/design-system/components/disclosure/accordion/accordion";',
    component: Accordion.Root,
    defaultProps: {
      collapsible: true,
      multiple: false,
    },
    propsSpec: [
      {
        name: "collapsible",
        type: "boolean",
        defaultValue: true,
        description: "Izinkan semua panel ditutup secara bersamaan.",
        controlKind: "boolean",
      },
      {
        name: "multiple",
        type: "boolean",
        defaultValue: false,
        description: "Izinkan membuka lebih dari satu panel sekaligus.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Accordion.Root
        collapsible={Boolean(props.collapsible)}
        multiple={Boolean(props.multiple)}
        defaultValue={["item-1"]}
        w={"full"}
        maxW={"380px"}
      >
        <Accordion.Item value={"item-1"}>
          <Accordion.ItemTrigger>
            <Span flex={1}>Informasi Dokumen</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody color={"fg.subtle"}>
              Detail dokumen dan berkas terverifikasi di dalam sistem ATR BPN.
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value={"item-2"}>
          <Accordion.ItemTrigger>
            <Span flex={1}>Riwayat Sinkronisasi</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody color={"fg.subtle"}>
              Sinkronisasi data layer peta spasial GeoServer terakhir berhasil.
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    ),
  },


  tabs: {
    key: "tabs",
    title: "Tabs",
    category: "Disclosure",
    description:
      "Navigasi tab switching dengan animasi underline indicator halus.",
    importPath:
      'import { Tabs } from "@/design-system/components/disclosure/tabs/tabs";',
    component: Tabs.Root,
    defaultProps: {
      variant: "line",
      size: "md",
      fitted: false,
      colorPalette: "blue",
    },
    propsSpec: [
      {
        name: "variant",
        type: '"line" | "subtle" | "outline" | "enclosed"',
        defaultValue: "line",
        description: "Gaya visual navigasi tab.",
        controlKind: "select",
        options: ["line", "subtle", "outline", "enclosed"],
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran tombol tab.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
      {
        name: "fitted",
        type: "boolean",
        defaultValue: false,
        description: "Ratakan lebar tab memenuhi lebar kontainer.",
        controlKind: "boolean",
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Skema warna aksen aktif tab.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
    ],
    renderPlayground: (props) => (
      <Tabs.Root
        defaultValue={"overview"}
        variant={
          (props.variant as "line" | "subtle" | "outline" | "enclosed") ||
          "line"
        }
        size={(props.size as "sm" | "md" | "lg") || "md"}
        fitted={Boolean(props.fitted)}
        colorPalette={(props.colorPalette as string) || "blue"}
        w={"full"}
        maxW={"380px"}
      >
        <Tabs.List>
          <Tabs.Trigger value={"overview"}>Overview</Tabs.Trigger>
          <Tabs.Trigger value={"specs"}>Spesifikasi</Tabs.Trigger>
          <Tabs.Trigger value={"history"}>Riwayat</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={"overview"} pt={3}>
          <P fontSize={"sm"} color={"fg.muted"}>
            Konten tab Overview terpilih.
          </P>
        </Tabs.Content>
        <Tabs.Content value={"specs"} pt={3}>
          <P fontSize={"sm"} color={"fg.muted"}>
            Konten spesifikasi teknis dan rincian.
          </P>
        </Tabs.Content>
        <Tabs.Content value={"history"} pt={3}>
          <P fontSize={"sm"} color={"fg.muted"}>
            Riwayat perubahan data.
          </P>
        </Tabs.Content>
      </Tabs.Root>
    ),
  },


  steps: {
    key: "steps",
    title: "Steps",
    category: "Disclosure",
    description: "Indikator alur proses bertahap bertingkat (wizard/stepper).",
    importPath:
      'import { Steps } from "@/design-system/components/disclosure/steps/steps";',
    component: Steps.Root,
    defaultProps: {
      defaultStep: 1,
      count: 3,
      size: "md",
      orientation: "horizontal",
      colorPalette: "blue",
    },
    propsSpec: [
      {
        name: "count",
        type: "number",
        defaultValue: undefined,
        required: true,
        description: "Jumlah total langkah proses (wajib).",
        controlKind: "number",
      },
      {
        name: "defaultStep",
        type: "number",
        defaultValue: 1,
        description: "Langkah aktif awal (0-indexed).",
        controlKind: "number",
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: "horizontal",
        description: "Arah orientasi alur langkah stepper.",
        controlKind: "select",
        options: ["horizontal", "vertical"],
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran indikator lingkaran step.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
      {
        name: "colorPalette",
        type: "string",
        defaultValue: "blue",
        description: "Skema warna aksen langkah aktif.",
        controlKind: "select",
        options: COLOR_PALETTE_OPTIONS,
      },
    ],
    generateCode: (props) => {
      const orientation = (props.orientation as string) || "horizontal";
      const orientationProp =
        orientation !== "horizontal" ? ` orientation={"${orientation}"}` : "";
      const sizeProp =
        props.size && props.size !== "md" ? ` size={"${props.size}"}` : "";
      const colorProp =
        props.colorPalette && props.colorPalette !== "blue"
          ? ` colorPalette={"${props.colorPalette}"}`
          : "";

      return `<Steps.Root\n  defaultStep={${Number(props.defaultStep) || 1}}\n  count={${Number(props.count) || 3}}${orientationProp}${sizeProp}${colorProp}\n  w={"full"}\n>\n  <Steps.List>\n    <Steps.Item index={0} title={"Langkah 1"}>\n      <Steps.Trigger>\n        <Steps.Indicator />\n        <Steps.Title fontSize={{ base: "xs", sm: "sm" }}>{"Biodata"}</Steps.Title>\n      </Steps.Trigger>\n      <Steps.Separator />\n    </Steps.Item>\n    <Steps.Item index={1} title={"Langkah 2"}>\n      <Steps.Trigger>\n        <Steps.Indicator />\n        <Steps.Title fontSize={{ base: "xs", sm: "sm" }}>{"Berkas"}</Steps.Title>\n      </Steps.Trigger>\n      <Steps.Separator />\n    </Steps.Item>\n    <Steps.Item index={2} title={"Langkah 3"}>\n      <Steps.Trigger>\n        <Steps.Indicator />\n        <Steps.Title fontSize={{ base: "xs", sm: "sm" }}>{"Selesai"}</Steps.Title>\n      </Steps.Trigger>\n    </Steps.Item>\n  </Steps.List>\n</Steps.Root>`;
    },
    renderPlayground: (props) => (
      <Steps.Root
        defaultStep={Number(props.defaultStep) || 1}
        count={Number(props.count) || 3}
        orientation={
          (props.orientation as "horizontal" | "vertical") || "horizontal"
        }
        size={(props.size as "sm" | "md" | "lg") || "md"}
        colorPalette={(props.colorPalette as string) || "blue"}
        w={"full"}
      >
        <Steps.List>
          <Steps.Item index={0} title={"Langkah 1"}>
            <Steps.Trigger>
              <Steps.Indicator />
              <Steps.Title fontSize={{ base: "xs", sm: "sm" }}>
                {"Biodata"}
              </Steps.Title>
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item index={1} title={"Langkah 2"}>
            <Steps.Trigger>
              <Steps.Indicator />
              <Steps.Title fontSize={{ base: "xs", sm: "sm" }}>
                {"Berkas"}
              </Steps.Title>
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item index={2} title={"Langkah 3"}>
            <Steps.Trigger>
              <Steps.Indicator />
              <Steps.Title fontSize={{ base: "xs", sm: "sm" }}>
                {"Selesai"}
              </Steps.Title>
            </Steps.Trigger>
          </Steps.Item>
        </Steps.List>
      </Steps.Root>
    ),
  },


  collapsible: {
    key: "collapsible",
    title: "Collapsible",
    category: "Disclosure",
    description:
      "Elemen ekspansi buka/tutup sederhana dengan animasi transisi.",
    importPath:
      'import { Collapsible } from "@/design-system/components/disclosure/collapsible/collapsible";',
    component: Collapsible.Root,
    defaultProps: {
      defaultOpen: true,
      unmountOnExit: false,
    },
    propsSpec: [
      {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: true,
        description: "Status awal konten dalam keadaan terbuka.",
        controlKind: "boolean",
      },
      {
        name: "unmountOnExit",
        type: "boolean",
        defaultValue: false,
        description: "Unmount elemen DOM saat ditutup.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Collapsible.Root
        defaultOpen={Boolean(props.defaultOpen)}
        unmountOnExit={Boolean(props.unmountOnExit)}
        w={"full"}
        maxW={"320px"}
      >
        <Collapsible.Trigger asChild>
          <Button variant={"outline"} size={"sm"}>
            Toggle Konten Tambahan
          </Button>
        </Collapsible.Trigger>
        <Collapsible.Content pt={3}>
          <Box p={3} rounded={"md"} bg={"bg.subtle"}>
            <P fontSize={"xs"}>
              Ini adalah konten tersembunyi di dalam Collapsible.
            </P>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    ),
  },


  carousel: {
    key: "carousel",
    title: "Carousel",
    category: "Disclosure",
    description:
      "Slider tayangan bergambar atau konten kartu bergerak dengan navigasi tombol dan indikator titik.",
    importPath:
      'import { Carousel } from "@/design-system/components/disclosure/carousel/carousel";',
    component: Carousel.Root,
    defaultProps: {
      slideCount: 4,
      loop: true,
      autoplay: false,
    },
    propsSpec: [
      {
        name: "slideCount",
        type: "number",
        defaultValue: 4,
        description: "Jumlah total item slide (wajib).",
        controlKind: "number",
      },
      {
        name: "loop",
        type: "boolean",
        defaultValue: true,
        description: "Putar kembali slide dari awal setelah slide terakhir.",
        controlKind: "boolean",
      },
      {
        name: "autoplay",
        type: "boolean",
        defaultValue: false,
        description: "Otomatis berpindah slide secara bergantian.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => {
      const carouselImages = [
        "https://images.unsplash.com/photo-1656433031375-5042f5afe894?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2371",
        "https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2673",
        "https://images.unsplash.com/photo-1629581688635-5d88654e5bdd?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2831",
        "https://images.unsplash.com/photo-1661030420948-862787de0056?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2370",
      ];
      const count = Math.min(
        Math.max(1, Number(props.slideCount) || 4),
        carouselImages.length,
      );
      const displayImages = carouselImages.slice(0, count);

      return (
        <Carousel.Root
          loop={Boolean(props.loop)}
          autoplay={Boolean(props.autoplay)}
          slideCount={displayImages.length}
          w={"350px"}
          maxW={"350px"}
          pos={"relative"}
        >
          <Carousel.Control>
            <Carousel.ItemGroup width={"full"}>
              {displayImages.map((src, index) => (
                <Carousel.Item key={index} index={index}>
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    objectFit={"cover"}
                    aspectRatio={16 / 9}
                    w={"full"}
                    rounded={"md"}
                  />
                </Carousel.Item>
              ))}
            </Carousel.ItemGroup>

            <HStack
              align={"center"}
              justify={"space-between"}
              w={"full"}
              px={2}
              pos={"absolute"}
              top={"50%"}
              transform={"translateY(-50%)"}
            >
              <Carousel.PrevTrigger asChild>
                <Carousel.ActionButton
                  size={"sm"}
                  color={"white"}
                  borderColor={"border.subtle"}
                  bg={"blackAlpha.600"}
                  _hover={{ bg: "blackAlpha.800" }}
                >
                  <LuArrowLeft />
                </Carousel.ActionButton>
              </Carousel.PrevTrigger>

              <Carousel.NextTrigger asChild>
                <Carousel.ActionButton
                  size={"sm"}
                  color={"white"}
                  borderColor={"border.subtle"}
                  bg={"blackAlpha.600"}
                  _hover={{ bg: "blackAlpha.800" }}
                >
                  <LuArrowRight />
                </Carousel.ActionButton>
              </Carousel.NextTrigger>
            </HStack>

            <Box pos={"absolute"} bottom={2} w={"full"}>
              <Carousel.Indicators
                bg={"whiteAlpha.700"}
                boxSize={1.5}
                transition={"200ms"}
                transformOrigin={"center"}
                _current={{
                  width: 5,
                  opacity: 1,
                  bg: "white",
                }}
              />
            </Box>
          </Carousel.Control>
        </Carousel.Root>
      );
    },
  },

};
