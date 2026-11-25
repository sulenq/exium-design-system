import { Box } from "@/design-system/components/layout/box/box";
import { Card } from "@/design-system/components/layout/card/card";
import { Container } from "@/design-system/components/layout/container/container";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { Separator } from "@/design-system/components/layout/separator/separator";
import { P } from "@/design-system/components/typography/p/p";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";

export const LAYOUT_CORE_DOCS: Record<string, ComponentDocSpec> = {

  box: {
    key: "box",
    title: "Box",
    category: "Layout",
    description:
      "Komponen dasar kontainer layout serbaguna dengan dukungan token tema Chakra.",
    importPath:
      'import { Box } from "@/design-system/components/layout/box/box";',
    component: Box,
    defaultProps: {
      p: 4,
      bg: "bg.subtle",
      rounded: "lg",
    },
    propsSpec: [
      {
        name: "p",
        type: "number | string",
        defaultValue: 4,
        description: "Besaran padding kontainer.",
        controlKind: "number",
      },
      {
        name: "bg",
        type: '"bg.subtle" | "bg.muted" | "bg.panel"',
        defaultValue: "bg.subtle",
        description: "Warna latar kontainer.",
        controlKind: "select",
        options: ["bg.subtle", "bg.muted", "bg.panel"],
      },
      {
        name: "rounded",
        type: '"none" | "sm" | "md" | "lg" | "full"',
        defaultValue: "lg",
        description: "Radius sudut border.",
        controlKind: "select",
        options: ["none", "sm", "md", "lg", "full"],
      },
    ],
    renderPlayground: (props) => (
      <Box
        p={Number(props.p) || 4}
        rounded={(props.rounded as "lg") || "lg"}
        bg={String(props.bg || "bg.subtle")}
        border={"1px solid"}
        borderColor={"border.subtle"}
      >
        <P fontWeight={"semibold"}>Exium Layout Box</P>
        <P fontSize={"sm"} color={"fg.muted"}>
          Kontainer layout dasar serbaguna untuk membangun struktur antarmuka.
        </P>
      </Box>
    ),
  },


  flex_box: {
    key: "flex_box",
    title: "HStack / VStack",
    category: "Layout",
    description:
      "Kontainer susunan fleksibel vertikal (VStack) atau horizontal (HStack) dengan alignment presisi.",
    importPath:
      'import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";',
    component: HStack,
    defaultProps: {
      direction: "horizontal",
      gap: 3,
      align: "center",
      justify: "start",
    },
    propsSpec: [
      {
        name: "direction",
        type: '"horizontal" | "vertical"',
        defaultValue: "horizontal",
        description:
          "Arah orientasi stack (HStack horizontal vs VStack vertikal).",
        controlKind: "select",
        options: ["horizontal", "vertical"],
      },
      {
        name: "gap",
        type: "number | string",
        defaultValue: 3,
        description: "Jarak spasi antar anak elemen.",
        controlKind: "number",
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        defaultValue: "center",
        description: "Pensejajaran sumbu silang (cross-axis alignment).",
        controlKind: "select",
        options: ["start", "center", "end"],
      },
      {
        name: "justify",
        type: '"start" | "center" | "end" | "space-between"',
        defaultValue: "start",
        description: "Pensejajaran sumbu utama (main-axis alignment).",
        controlKind: "select",
        options: ["start", "center", "end", "space-between"],
      },
    ],
    renderPlayground: (props) => {
      const isVertical = props.direction === "vertical";
      const StackComp = isVertical ? VStack : HStack;

      return (
        <StackComp
          gap={Number(props.gap) || 3}
          align={(props.align as "center") || "center"}
          justify={(props.justify as "start") || "start"}
          w={"full"}
          maxW={isVertical ? "260px" : "380px"}
          p={3}
          border={"1px dashed"}
          borderColor={"border.subtle"}
          rounded={"md"}
        >
          <Box
            p={3}
            bg={"blue.subtle"}
            rounded={"md"}
            textAlign={"center"}
            w={isVertical ? "full" : "auto"}
          >
            <P fontSize={"xs"} fontWeight={"bold"} color={"blue.fg"}>
              Item 1
            </P>
          </Box>
          <Box
            p={3}
            bg={"teal.subtle"}
            rounded={"md"}
            textAlign={"center"}
            w={isVertical ? "full" : "auto"}
          >
            <P fontSize={"xs"} fontWeight={"bold"} color={"teal.fg"}>
              Item 2
            </P>
          </Box>
          <Box
            p={3}
            bg={"purple.subtle"}
            rounded={"md"}
            textAlign={"center"}
            w={isVertical ? "full" : "auto"}
          >
            <P fontSize={"xs"} fontWeight={"bold"} color={"purple.fg"}>
              Item 3
            </P>
          </Box>
        </StackComp>
      );
    },
  },


  grid: {
    key: "grid",
    title: "SimpleGrid",
    category: "Layout",
    description:
      "Grid responsif yang mudah digunakan untuk menyusun kartu dan elemen multi-kolom.",
    importPath:
      'import { SimpleGrid } from "@/design-system/components/layout/grid/grid";',
    component: SimpleGrid,
    defaultProps: {
      columns: 3,
      gap: 3,
    },
    propsSpec: [
      {
        name: "columns",
        type: "number",
        defaultValue: 3,
        description: "Jumlah kolom grid.",
        controlKind: "number",
      },
      {
        name: "gap",
        type: "number | string",
        defaultValue: 3,
        description: "Jarak spasi antar item.",
        controlKind: "number",
      },
    ],
    renderPlayground: (props) => (
      <SimpleGrid
        columns={Number(props.columns) || 3}
        gap={Number(props.gap) || 3}
        w={"full"}
        maxW={"400px"}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Box
            key={item}
            p={3}
            rounded={"md"}
            bg={"bg.muted"}
            textAlign={"center"}
          >
            <P fontSize={"xs"} fontWeight={"bold"}>
              Item {item}
            </P>
          </Box>
        ))}
      </SimpleGrid>
    ),
  },


  card: {
    key: "card",
    title: "Card",
    category: "Layout",
    description:
      "Kartu presentasi informasi modular dengan container token styling.",
    importPath:
      'import { Card } from "@/design-system/components/layout/card/card";',
    component: Card.Root,
    defaultProps: {
      variant: "outline",
      size: "md",
    },
    propsSpec: [
      {
        name: "variant",
        type: '"outline" | "subtle" | "elevated"',
        defaultValue: "outline",
        description: "Gaya visual tampilan kartu.",
        controlKind: "select",
        options: ["outline", "subtle", "elevated"],
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran padding dan konten kartu.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
    ],
    renderPlayground: (props) => (
      <Card.Root
        variant={
          (props.variant as "outline" | "subtle" | "elevated") || "outline"
        }
        size={(props.size as "sm" | "md" | "lg") || "md"}
        maxW={"320px"}
        w={"full"}
      >
        <Card.Header>
          <P fontWeight={"bold"}>Exium Card</P>
        </Card.Header>
        <Card.Body>
          <P fontSize={"sm"} color={"fg.muted"}>
            Kartu layout dengan styling border, padding, dan background serasi
            tema.
          </P>
        </Card.Body>
      </Card.Root>
    ),
  },


  container: {
    key: "container",
    title: "Container",
    category: "Layout",
    description:
      "Kontainer pembungkus halaman dengan header terintegrasi dan responsivitas adaptif.",
    importPath:
      'import { Container } from "@/design-system/components/layout/container/container";',
    component: Container.Root,
    defaultProps: {
      withContext: false,
    },
    propsSpec: [
      {
        name: "withContext",
        type: "boolean",
        defaultValue: false,
        description: "Sediakan konteks dimensi container kepada sub-komponen.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Container.Root
        withContext={Boolean(props.withContext)}
        w={"full"}
        maxW={"380px"}
      >
        <Container.Header title={"Container Title"} />
        <Container.Body p={4}>
          <P fontSize={"sm"} color={"fg.muted"}>
            Isi konten dalam container box.
          </P>
        </Container.Body>
      </Container.Root>
    ),
  },


  separator: {
    key: "separator",
    title: "Separator",
    category: "Layout",
    description:
      "Garis pemisah visual horizontal atau vertikal antar bagian antarmuka.",
    importPath:
      'import { Separator } from "@/design-system/components/layout/separator/separator";',
    component: Separator,
    defaultProps: {
      orientation: "horizontal",
      size: "sm",
    },
    propsSpec: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: "horizontal",
        description: "Arah garis pemisah.",
        controlKind: "select",
        options: ["horizontal", "vertical"],
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg"',
        defaultValue: "sm",
        description: "Ketebalan garis pemisah.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg"],
      },
    ],
    renderPlayground: (props) => {
      const isVertical = props.orientation === "vertical";
      const size = (props.size as "xs" | "sm" | "md" | "lg") || "sm";

      if (isVertical) {
        return (
          <HStack
            gap={4}
            h={"70px"}
            align={"center"}
            justify={"center"}
            p={4}
            border={"1px dashed"}
            borderColor={"border.subtle"}
            rounded={"md"}
          >
            <P fontSize={"sm"} fontWeight={"medium"}>
              Sisi Kiri
            </P>
            <Separator orientation={"vertical"} size={size} h={"40px"} />
            <P fontSize={"sm"} fontWeight={"medium"}>
              Sisi Kanan
            </P>
          </HStack>
        );
      }

      return (
        <VStack
          gap={3}
          w={"full"}
          maxW={"300px"}
          p={4}
          border={"1px dashed"}
          borderColor={"border.subtle"}
          rounded={"md"}
        >
          <P fontSize={"sm"} fontWeight={"medium"}>
            Bagian Atas
          </P>
          <Separator orientation={"horizontal"} size={size} w={"full"} />
          <P fontSize={"sm"} fontWeight={"medium"}>
            Bagian Bawah
          </P>
        </VStack>
      );
    },
  },

};
