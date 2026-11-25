import { Button } from "@/design-system/components/button/button/button";
import { ActionHeaderScrollContainer } from "@/design-system/components/layout/action-header-scroll-container/action-header-scroll-container";
import { AspectRatio } from "@/design-system/components/layout/aspect-ratio/aspect-ratio";
import { Box } from "@/design-system/components/layout/box/box";
import { AbsoluteCenter, Center } from "@/design-system/components/layout/center/center";
import { ClickableContainer } from "@/design-system/components/layout/clickable-container/clickable-container";
import { ConstrainedContainer } from "@/design-system/components/layout/constrained-container/constrained-container";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Float } from "@/design-system/components/layout/float/float";
import { Group } from "@/design-system/components/layout/group/group";
import { HMaskedContainer, VMaskedContainer } from "@/design-system/components/layout/masked-container/masked-container";
import { PageContainer } from "@/design-system/components/layout/page-container/page-container";
import { HScrollContainer, VScrollContainer } from "@/design-system/components/layout/scroll-container/scroll-container";
import { Splitter } from "@/design-system/components/layout/splitter/splitter";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { CountBadge } from "@/design-system/components/typography/count-badge/count-badge";
import { P } from "@/design-system/components/typography/p/p";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { Card } from "@/design-system/components/layout/card/card";
import { Container } from "@/design-system/components/layout/container/container";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { SimpleGrid } from "@/design-system/components/layout/grid/grid";
import { Separator } from "@/design-system/components/layout/separator/separator";

// -------------------------------------------------------------------------------------
// Demo helpers
// -------------------------------------------------------------------------------------

const DEMO_CHIPS = [
  "Sapi",
  "Kambing",
  "Domba",
  "Kerbau",
  "Ayam",
  "Bebek",
  "Kuda",
  "Babi",
  "Kelinci",
  "Itik",
];

const DemoTile = (props: { label: string }) => {
  // Props
  const { label } = props;

  return (
    <Center
      flexShrink={0}
      minW={"120px"}
      h={"64px"}
      rounded={"md"}
      bg={"bg.subtle"}
      border={"1px solid"}
      borderColor={"border.subtle"}
    >
      <P fontSize={"sm"}>{label}</P>
    </Center>
  );
};

const DemoRows = (props: { count: number }) => {
  // Props
  const { count } = props;

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          px={3}
          py={2}
          borderBottom={"1px solid"}
          borderColor={"border.subtle"}
        >
          <P fontSize={"sm"}>{`Catatan pemeriksaan #${index + 1}`}</P>
        </Box>
      ))}
    </>
  );
};

// -------------------------------------------------------------------------------------
// Specs
// -------------------------------------------------------------------------------------

export const LAYOUT_DOCS: Record<string, ComponentDocSpec> = {
  center: {
    key: "center",
    title: "Center",
    category: "Layout",
    description:
      "Menaruh isi tepat di tengah secara horizontal dan vertikal. AbsoluteCenter menengahkan relatif terhadap parent yang `position: relative`.",
    importPath:
      'import { AbsoluteCenter, Center } from "@/design-system/components/layout/center/center";',
    component: Center,
    defaultProps: { variant: "Center" },
    propsSpec: [
      {
        name: "variant",
        type: "string",
        defaultValue: "Center",
        description: "Pilih komponen yang didemokan.",
        controlKind: "select",
        options: ["Center", "AbsoluteCenter"],
      },
    ],
    generateCode: (props) =>
      props.variant === "AbsoluteCenter"
        ? `<Box pos={"relative"} w={"full"} h={"160px"} bg={"bg.subtle"} rounded={"md"}>
  <AbsoluteCenter>
    <Badge>{"Di tengah parent"}</Badge>
  </AbsoluteCenter>
</Box>`
        : `<Center w={"full"} h={"160px"} bg={"bg.subtle"} rounded={"md"}>
  <Badge>{"Di tengah kotak"}</Badge>
</Center>`,
    renderPlayground: (props) =>
      props.variant === "AbsoluteCenter" ? (
        <Box pos={"relative"} w={"full"} h={"160px"} bg={"bg.subtle"} rounded={"md"}>
          <AbsoluteCenter>
            <Badge>{"Di tengah parent"}</Badge>
          </AbsoluteCenter>
        </Box>
      ) : (
        <Center w={"full"} h={"160px"} bg={"bg.subtle"} rounded={"md"}>
          <Badge>{"Di tengah"}</Badge>
        </Center>
      ),
  },

  aspect_ratio: {
    key: "aspect_ratio",
    title: "AspectRatio",
    category: "Layout",
    description:
      "Menjaga rasio lebar-tinggi isi (foto, video, peta) agar tidak melar saat lebar layar berubah.",
    importPath:
      'import { AspectRatio } from "@/design-system/components/layout/aspect-ratio/aspect-ratio";',
    component: AspectRatio,
    defaultProps: { ratio: 16 / 9 },
    propsSpec: [
      {
        name: "ratio",
        type: "number",
        defaultValue: 16 / 9,
        description: "Rasio lebar dibagi tinggi.",
        controlKind: "select",
        options: [1, 4 / 3, 16 / 9, 21 / 9],
      },
    ],
    generateCode: (props) => {
      const ratio = Number(props.ratio) || 16 / 9;
      return `<Box w={"full"} maxW={"360px"}>
  <AspectRatio ratio={${Number(ratio.toFixed(2))}}>
    <Center bg={"bg.subtle"} rounded={"md"}>
      <P fontSize={"sm"}>{"Rasio ${ratio.toFixed(2)}"}</P>
    </Center>
  </AspectRatio>
</Box>`;
    },
    renderPlayground: (props) => (
      <Box w={"full"} maxW={"360px"}>
        <AspectRatio ratio={Number(props.ratio) || 16 / 9}>
          <Center bg={"bg.subtle"} rounded={"md"}>
            <P fontSize={"sm"}>{`Rasio ${Number(props.ratio).toFixed(2)}`}</P>
          </Center>
        </AspectRatio>
      </Box>
    ),
  },

  float: {
    key: "float",
    title: "Float",
    category: "Layout",
    description:
      "Menempelkan elemen kecil (badge, indikator) di sudut elemen lain. Parent harus `position: relative`.",
    importPath:
      'import { Float } from "@/design-system/components/layout/float/float";',
    component: Float,
    defaultProps: { placement: "top-end" },
    propsSpec: [
      {
        name: "placement",
        type: "string",
        defaultValue: "top-end",
        description: "Posisi terhadap parent.",
        controlKind: "select",
        options: [
          "top-start",
          "top-center",
          "top-end",
          "middle-start",
          "middle-end",
          "bottom-start",
          "bottom-center",
          "bottom-end",
        ],
      },
    ],
    generateCode: (props) => `<Box pos={"relative"} w={"96px"} h={"96px"} bg={"bg.subtle"} rounded={"md"}>
  <Float placement={"${String(props.placement || "top-end")}"}>
    <CountBadge>{3}</CountBadge>
  </Float>
</Box>`,
    renderPlayground: (props) => (
      <Box pos={"relative"} w={"96px"} h={"96px"} bg={"bg.subtle"} rounded={"md"}>
        <Float placement={(props.placement as "top-end") || "top-end"}>
          <CountBadge>{3}</CountBadge>
        </Float>
      </Box>
    ),
  },

  group: {
    key: "group",
    title: "Group",
    category: "Layout",
    description:
      "Mengelompokkan elemen yang berdampingan. Dengan `attached`, sudut dan border di antara elemen digabung, misalnya untuk button bersambung.",
    importPath:
      'import { Group } from "@/design-system/components/layout/group/group";',
    component: Group,
    defaultProps: { attached: true },
    propsSpec: [
      {
        name: "attached",
        type: "boolean",
        defaultValue: true,
        description: "Gabungkan sudut dan border antar elemen.",
        controlKind: "boolean",
      },
      {
        name: "grow",
        type: "boolean",
        defaultValue: false,
        description: "Setiap elemen membagi lebar yang tersedia secara rata.",
        controlKind: "boolean",
      },
    ],
    generateCode: (props) => {
      const attachedProp = props.attached ? " attached={true}" : "";
      const growProp = props.grow ? " grow={true}" : "";
      return `<Group${attachedProp}${growProp} w={"full"} maxW={"360px"}>
  <Button variant={"outline"}>{"Harian"}</Button>
  <Button variant={"outline"}>{"Mingguan"}</Button>
  <Button variant={"outline"}>{"Bulanan"}</Button>
</Group>`;
    },
    renderPlayground: (props) => (
      <Group attached={Boolean(props.attached)} grow={Boolean(props.grow)} w={"full"} maxW={"360px"}>
        <Button variant={"outline"}>{"Harian"}</Button>
        <Button variant={"outline"}>{"Mingguan"}</Button>
        <Button variant={"outline"}>{"Bulanan"}</Button>
      </Group>
    ),
  },

  clickable_container: {
    key: "clickable_container",
    title: "ClickableContainer",
    category: "Layout",
    description:
      "Membuat seluruh area kartu bisa diklik untuk memicu satu input di dalamnya (misalnya checkbox atau file input), sehingga target sentuh jauh lebih besar dari input itu sendiri.",
    importPath:
      'import { ClickableContainer } from "@/design-system/components/layout/clickable-container/clickable-container";',
    component: ClickableContainer,
    defaultProps: { asLabel: true },
    propsSpec: [
      {
        name: "asLabel",
        type: "boolean",
        defaultValue: true,
        description: "Render sebagai `<label>` agar klik di mana saja memicu input di dalamnya.",
        controlKind: "boolean",
      },
      {
        name: "targetRef",
        type: "RefObject<HTMLInputElement>",
        description: "Input yang dipicu saat container diklik, jika tidak memakai `asLabel`.",
      },
    ],
    generateCode: (props) => {
      const asLabelProp = props.asLabel ? "\n  asLabel={true}" : "";
      return `<ClickableContainer${asLabelProp}
  p={4}
  gap={3}
  flexDir={"row"}
  align={"center"}
  border={"1px solid"}
  borderColor={"border.subtle"}
  onClick={() => {}}
>
  <P fontSize={"sm"}>{"Klik kartu ini"}</P>
</ClickableContainer>`;
    },
    renderPlayground: (props) => (
      <ClickableContainer
        asLabel={Boolean(props.asLabel)}
        p={4}
        gap={3}
        flexDir={"row"}
        align={"center"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        rounded={"md"}
        cursor={"pointer"}
        w={"full"}
        maxW={"360px"}
      >
        <input type={"checkbox"} aria-label={"Sudah divaksin"} />
        <VStack align={"start"} gap={0}>
          <P fontWeight={"medium"}>{"Sudah divaksin"}</P>
          <P fontSize={"sm"} color={"fg.muted"}>
            {"Klik di mana saja pada kartu ini."}
          </P>
        </VStack>
      </ClickableContainer>
    ),
  },

  constrained_container: {
    key: "constrained_container",
    title: "ConstrainedContainer",
    category: "Layout",
    description:
      "Membatasi lebar konten agar nyaman dibaca, mengikuti lebar maksimal layout dari layout store. Konten tetap di tengah.",
    importPath:
      'import { ConstrainedContainer } from "@/design-system/components/layout/constrained-container/constrained-container";',
    component: ConstrainedContainer,
    defaultProps: { maxW: "480px" },
    propsSpec: [
      {
        name: "maxW",
        type: "string",
        defaultValue: "480px",
        description: "Lebar maksimal. Kosongkan untuk memakai lebar dari layout store.",
        controlKind: "select",
        options: ["320px", "480px", "720px"],
      },
      {
        name: "useStoreMaxW",
        type: "boolean",
        defaultValue: true,
        description: "Pakai lebar dari layout store saat `maxW` tidak diisi.",
      },
    ],
    generateCode: (props) => `<ConstrainedContainer maxW={"${String(props.maxW || "480px")}"} bg={"bg.body"} p={4} rounded={"md"}>
  <P fontSize={"sm"}>{"Konten dibatasi lebarnya dan selalu berada di tengah."}</P>
</ConstrainedContainer>`,
    renderPlayground: (props) => (
      <Box w={"full"} bg={"bg.subtle"} py={4} rounded={"md"}>
        <ConstrainedContainer maxW={String(props.maxW || "480px")} bg={"bg.body"} p={4} rounded={"md"}>
          <P fontSize={"sm"}>
            {"Konten dibatasi lebarnya dan selalu berada di tengah."}
          </P>
        </ConstrainedContainer>
      </Box>
    ),
  },

  page_container: {
    key: "page_container",
    title: "PageContainer",
    category: "Layout",
    description:
      "Kerangka satu halaman penuh. AppPageContainer dan AppContentContainer adalah varian untuk halaman di dalam app shell.",
    importPath:
      'import { AppContentContainer, AppPageContainer, PageContainer } from "@/design-system/components/layout/page-container/page-container";',
    component: PageContainer,
    defaultProps: {},
    propsSpec: [
      {
        name: "...StackProps",
        type: "StackProps",
        description: "Semua props VStack, misalnya `flexDir`, `gap`, `p`.",
      },
    ],
    generateCode: () => `<PageContainer minH={"full"} h={"full"} p={4} gap={2}>
  <P fontWeight={"semibold"}>{"Daftar Ternak"}</P>
  <P fontSize={"sm"} color={"fg.muted"}>
    {"Isi halaman ditempatkan di dalam PageContainer."}
  </P>
</PageContainer>`,
    renderPlayground: () => (
      <Box w={"full"} h={"200px"} overflow={"hidden"} rounded={"md"} border={"1px solid"} borderColor={"border.subtle"}>
        <PageContainer minH={"full"} h={"full"} p={4} gap={2}>
          <P fontWeight={"semibold"}>{"Daftar Ternak"}</P>
          <P fontSize={"sm"} color={"fg.muted"}>
            {"Isi halaman ditempatkan di dalam PageContainer."}
          </P>
        </PageContainer>
      </Box>
    ),
  },

  scroll_container: {
    key: "scroll_container",
    title: "ScrollContainer",
    category: "Layout",
    description:
      "Area scroll vertikal (VScrollContainer) atau horizontal (HScrollContainer) dengan border yang muncul saat konten tergulir dan tombol scroll opsional.",
    importPath:
      'import { HScrollContainer, VScrollContainer } from "@/design-system/components/layout/scroll-container/scroll-container";',
    component: VScrollContainer,
    defaultProps: { direction: "vertical", showScrollButtons: false },
    propsSpec: [
      {
        name: "direction",
        type: "string",
        defaultValue: "vertical",
        description: "Pilih VScrollContainer atau HScrollContainer.",
        controlKind: "select",
        options: ["vertical", "horizontal"],
      },
      {
        name: "showScrollButtons",
        type: "boolean",
        defaultValue: false,
        description: "Tampilkan tombol scroll di ujung.",
        controlKind: "boolean",
      },
      {
        name: "enableScroll",
        type: "boolean",
        defaultValue: true,
        description: "Matikan untuk mengunci scroll.",
      },
    ],
    generateCode: (props) =>
      props.direction === "horizontal"
        ? `<HScrollContainer w={"full"} maxW={"420px"} gap={2} pb={2}>
  {DEMO_CHIPS.map((label) => (
    <Button key={label} size={"sm"} variant={"outline"} flexShrink={0}>
      {label}
    </Button>
  ))}
</HScrollContainer>`
        : `<VScrollContainer w={"full"} maxW={"360px"} h={"180px"} gap={2}>
  <DemoRows count={12} />
</VScrollContainer>`,
    renderPlayground: (props) =>
      props.direction === "horizontal" ? (
        <HScrollContainer
          w={"full"}
          maxW={"420px"}
          gap={2}
          showLeftBorderOnScroll={true}
          showRightBorderOnScroll={true}
          showScrollButtons={Boolean(props.showScrollButtons)}
        >
          {DEMO_CHIPS.map((label) => (
            <DemoTile key={label} label={label} />
          ))}
        </HScrollContainer>
      ) : (
        <VScrollContainer
          w={"full"}
          maxW={"360px"}
          h={"200px"}
          border={"1px solid"}
          borderColor={"border.subtle"}
          rounded={"md"}
          showTopBorderOnScroll={true}
          showBottomBorderOnScroll={true}
          showScrollButtons={Boolean(props.showScrollButtons)}
        >
          <DemoRows count={12} />
        </VScrollContainer>
      ),
  },

  action_header_scroll_container: {
    key: "action_header_scroll_container",
    title: "ActionHeaderScrollContainer",
    category: "Layout",
    description:
      "Baris aksi horizontal di header (filter, chip, tombol) yang bisa digulir saat tidak muat di layar kecil.",
    importPath:
      'import { ActionHeaderScrollContainer } from "@/design-system/components/layout/action-header-scroll-container/action-header-scroll-container";',
    component: ActionHeaderScrollContainer,
    defaultProps: {},
    propsSpec: [
      {
        name: "...HScrollContainerProps",
        type: "HScrollContainerProps",
        description: "Semua props HScrollContainer.",
      },
    ],
    generateCode: () => `<ActionHeaderScrollContainer w={"full"} maxW={"420px"} gap={2}>
  {DEMO_CHIPS.map((label) => (
    <Button key={label} size={"sm"} variant={"outline"} flexShrink={0}>
      {label}
    </Button>
  ))}
</ActionHeaderScrollContainer>`,
    renderPlayground: () => (
      <ActionHeaderScrollContainer w={"full"} maxW={"420px"} gap={2}>
        {DEMO_CHIPS.map((label) => (
          <Button key={label} size={"sm"} variant={"outline"} flexShrink={0}>
            {label}
          </Button>
        ))}
      </ActionHeaderScrollContainer>
    ),
  },

  masked_container: {
    key: "masked_container",
    title: "MaskedContainer",
    category: "Layout",
    description:
      "Memudarkan tepi konten yang terpotong (atas-bawah atau kiri-kanan) sebagai tanda bahwa masih ada isi yang bisa digulir.",
    importPath:
      'import { HMaskedContainer, VMaskedContainer } from "@/design-system/components/layout/masked-container/masked-container";',
    component: VMaskedContainer,
    defaultProps: { direction: "horizontal" },
    propsSpec: [
      {
        name: "direction",
        type: "string",
        defaultValue: "horizontal",
        description: "Pilih HMaskedContainer atau VMaskedContainer.",
        controlKind: "select",
        options: ["horizontal", "vertical"],
      },
      {
        name: "maskingLeft / maskingRight",
        type: "string | number",
        description: "Lebar area pudar di kiri dan kanan (HMaskedContainer).",
      },
      {
        name: "maskingTop / maskingBottom",
        type: "string | number",
        description: "Tinggi area pudar di atas dan bawah (VMaskedContainer).",
      },
    ],
    generateCode: (props) =>
      props.direction === "vertical"
        ? `<VMaskedContainer w={"full"} maxW={"360px"} h={"180px"} overflowY={"auto"} maskingTop={"24px"} maskingBottom={"24px"}>
  <DemoRows count={12} />
</VMaskedContainer>`
        : `<HMaskedContainer w={"full"} maxW={"420px"} overflowX={"auto"} maskingLeft={"24px"} maskingRight={"24px"}>
  <HStack gap={2} pb={2}>
    {DEMO_CHIPS.map((label) => (
      <Button key={label} size={"sm"} variant={"outline"} flexShrink={0}>
        {label}
      </Button>
    ))}
  </HStack>
</HMaskedContainer>`,
    renderPlayground: (props) =>
      props.direction === "vertical" ? (
        <VMaskedContainer w={"full"} maxW={"360px"} h={"180px"} overflowY={"auto"} maskingTop={"24px"} maskingBottom={"24px"}>
          <DemoRows count={12} />
        </VMaskedContainer>
      ) : (
        <HMaskedContainer w={"full"} maxW={"420px"} overflowX={"auto"} gap={2} maskingLeft={"24px"} maskingRight={"48px"}>
          {DEMO_CHIPS.map((label) => (
            <DemoTile key={label} label={label} />
          ))}
        </HMaskedContainer>
      ),
  },

  splitter: {
    key: "splitter",
    title: "Splitter",
    category: "Layout",
    description:
      "Membagi area menjadi panel yang ukurannya bisa diubah dengan menarik pemisah. Mode `snappy` menempelkan panel ke ukuran tertentu.",
    importPath:
      'import { Splitter } from "@/design-system/components/layout/splitter/splitter";',
    component: Splitter.Root,
    defaultProps: { orientation: "horizontal", mode: "free" },
    propsSpec: [
      {
        name: "orientation",
        type: "string",
        defaultValue: "horizontal",
        description: "Arah pembagian panel.",
        controlKind: "select",
        options: ["horizontal", "vertical"],
      },
      {
        name: "mode",
        type: "string",
        defaultValue: "free",
        description: "`free` bisa di ukuran mana saja; `snappy` menempel ke ukuran tertentu.",
        controlKind: "select",
        options: ["free", "snappy"],
      },
      {
        name: "defaultLayout",
        type: "number[]",
        description: "Ukuran awal tiap panel dalam persen.",
      },
      {
        name: "onLayout",
        type: "(layout: number[]) => void",
        description: "Dipanggil saat ukuran panel berubah.",
      },
    ],
    a11y: {
      role: "separator",
      keyboardNav: [
        { key: "Arrow keys", action: "Geser pemisah saat fokus berada di pemisah." },
      ],
    },
    generateCode: (props) => `<Splitter.Root
  orientation={"${String(props.orientation || "horizontal")}"}
  mode={"${String(props.mode || "free")}"}
  defaultSize={[50, 50]}
>
  <Splitter.Panel id={"a"}>{"Panel A"}</Splitter.Panel>
  <Splitter.ResizeTrigger id={"a:b"} />
  <Splitter.Panel id={"b"}>{"Panel B"}</Splitter.Panel>
</Splitter.Root>`,
    renderPlayground: (props) => (
      <Box w={"full"} h={"240px"} border={"1px solid"} borderColor={"border.subtle"} rounded={"md"} overflow={"hidden"}>
        <Splitter.Root
          key={String(props.orientation)}
          orientation={(props.orientation as "horizontal") || "horizontal"}
          mode={(props.mode as "free") || "free"}
          defaultLayout={[40, 60]}
        >
          <Splitter.Panel id={"list"} minSize={20}>
            <Center h={"full"} bg={"bg.subtle"}>
              <P fontSize={"sm"}>{"Daftar"}</P>
            </Center>
          </Splitter.Panel>
          <Splitter.ResizeTrigger id={"list:detail"} />
          <Splitter.Panel id={"detail"} minSize={20}>
            <Center h={"full"}>
              <P fontSize={"sm"}>{"Detail"}</P>
            </Center>
          </Splitter.Panel>
        </Splitter.Root>
      </Box>
    ),
  },


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
