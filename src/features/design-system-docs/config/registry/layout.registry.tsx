// src/features/design-system-docs/config/registry/layout.registry.tsx

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
import {
  HMaskedContainer,
  VMaskedContainer,
} from "@/design-system/components/layout/masked-container/masked-container";
import { PageContainer } from "@/design-system/components/layout/page-container/page-container";
import {
  HScrollContainer,
  VScrollContainer,
} from "@/design-system/components/layout/scroll-container/scroll-container";
import { Splitter } from "@/design-system/components/layout/splitter/splitter";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { CountBadge } from "@/design-system/components/typography/count-badge/count-badge";
import { P } from "@/design-system/components/typography/p/p";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";

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
};
