// src/features/design-system-docs/config/registry/display.registry.tsx

import { Button } from "@/design-system/components/button/button/button";
import { CloseButton } from "@/design-system/components/button/close-button/close-button";
import {
  ChartTooltip,
  ChartTooltipContent,
} from "@/design-system/components/charts/chart-tooltip/chart-tooltip";
import { OutlineContourPerspective } from "@/design-system/components/decorative/outline-contour-perspective/outline-contour-perspective";
import { Box } from "@/design-system/components/layout/box/box";
import { Center } from "@/design-system/components/layout/center/center";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { ActionBar } from "@/design-system/components/overlay/action-bar/action-bar";
import { CursorTooltip } from "@/design-system/components/overlay/cursor-tooltip/cursor-tooltip";
import { List } from "@/design-system/components/typography/list/list";
import { P } from "@/design-system/components/typography/p/p";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

// -------------------------------------------------------------------------------------
// Demo data
// -------------------------------------------------------------------------------------

const DEMO_WEIGHT_DATA = [
  { month: "Jul", berat: 380 },
  { month: "Agu", berat: 392 },
  { month: "Sep", berat: 401 },
  { month: "Okt", berat: 412 },
  { month: "Nov", berat: 420 },
];

const DEMO_LIST_ITEMS = [
  "Pastikan eartag terpasang sebelum vaksinasi.",
  "Catat berat badan setiap bulan.",
  "Laporkan gejala PMK dalam 24 jam.",
];

// -------------------------------------------------------------------------------------
// Specs
// -------------------------------------------------------------------------------------

export const DISPLAY_DOCS: Record<string, ComponentDocSpec> = {
  list: {
    key: "list",
    title: "List",
    category: "Typography",
    description:
      "Daftar berpoin atau bernomor dengan jarak dan indikator yang konsisten. Pakai `as=\"ol\"` untuk urutan langkah.",
    importPath:
      'import { List } from "@/design-system/components/typography/list/list";',
    component: List.Root,
    defaultProps: { ordered: false },
    propsSpec: [
      {
        name: "ordered",
        type: "boolean",
        defaultValue: false,
        description: "Demo: render sebagai daftar bernomor (`as=\"ol\"`).",
        controlKind: "boolean",
      },
      {
        name: "gap",
        type: "string | number",
        description: "Jarak antar item.",
      },
    ],
    renderPlayground: (props) => (
      <List.Root as={props.ordered ? "ol" : "ul"} gap={2} ps={5} maxW={"420px"}>
        {DEMO_LIST_ITEMS.map((item) => (
          <List.Item key={item}>{item}</List.Item>
        ))}
      </List.Root>
    ),
  },

  chart_tooltip: {
    key: "chart_tooltip",
    title: "ChartTooltip",
    category: "Data Display",
    description:
      "Tooltip Recharts dengan gaya Exium. Pasang `ChartTooltip` di dalam chart dan `ChartTooltipContent` sebagai `content`. Arahkan kursor ke batang untuk melihatnya.",
    importPath:
      'import { ChartTooltip, ChartTooltipContent } from "@/design-system/components/charts/chart-tooltip/chart-tooltip";',
    component: ChartTooltip,
    defaultProps: {},
    propsSpec: [
      {
        name: "content",
        type: "ReactElement",
        description: "Isi tooltip; pakai `<ChartTooltipContent />`.",
      },
      {
        name: "...TooltipProps",
        type: "Recharts TooltipProps",
        description: "Semua props Tooltip Recharts.",
      },
    ],
    renderPlayground: () => (
      <Box w={"full"} maxW={"420px"} h={"200px"}>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart data={DEMO_WEIGHT_DATA}>
            <XAxis dataKey={"month"} tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} cursor={{ fillOpacity: 0.1 }} />
            <Bar dataKey={"berat"} name={"Berat (kg)"} fill={"var(--chakra-colors-green-600)"} radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    ),
  },

  outline_contour_perspective: {
    key: "outline_contour_perspective",
    title: "OutlineContourPerspective",
    category: "Decorative",
    description:
      "Ilustrasi kontur garis untuk latar dekoratif (halaman login, hero). Warna mengikuti tema dan mode terang-gelap kecuali `color` diisi.",
    importPath:
      'import { OutlineContourPerspective } from "@/design-system/components/decorative/outline-contour-perspective/outline-contour-perspective";',
    component: OutlineContourPerspective,
    defaultProps: {},
    propsSpec: [
      {
        name: "color",
        type: "string",
        description: "Warna garis. Default mengikuti tema.",
        controlKind: "color",
      },
    ],
    a11y: {
      notes: "Dekoratif saja; jangan taruh informasi penting di dalamnya.",
    },
    renderPlayground: (props) => (
      <Box pos={"relative"} w={"full"} h={"220px"} overflow={"hidden"} rounded={"md"} bg={"bg.subtle"}>
        <OutlineContourPerspective
          color={props.color ? String(props.color) : undefined}
          pos={"absolute"}
          inset={0}
        />
      </Box>
    ),
  },

  action_bar: {
    key: "action_bar",
    title: "ActionBar",
    category: "Overlay",
    description:
      "Bar aksi mengambang di bawah layar untuk aksi massal, misalnya saat beberapa baris tabel dipilih. Dipakai oleh DataViewBatchActions.",
    importPath:
      'import { ActionBar } from "@/design-system/components/overlay/action-bar/action-bar";',
    component: ActionBar.Root,
    defaultProps: { open: true },
    propsSpec: [
      {
        name: "open",
        type: "boolean",
        defaultValue: true,
        description: "Tampilkan bar.",
        controlKind: "boolean",
      },
      {
        name: "onOpenChange",
        type: "(details: { open: boolean }) => void",
        description: "Dipanggil saat bar ditutup, misalnya lewat CloseTrigger atau Escape.",
      },
    ],
    a11y: {
      keyboardNav: [{ key: "Escape", action: "Tutup bar." }],
    },
    renderPlayground: (props) => (
      <ActionBar.Root open={Boolean(props.open)}>
        <ActionBar.Positioner>
          <ActionBar.Content>
            <P fontSize={"sm"}>{"3 ternak dipilih"}</P>
            <ActionBar.Separator />
            <Button size={"sm"} variant={"outline"}>
              {"Jadwalkan vaksin"}
            </Button>
            <ActionBar.CloseTrigger asChild>
              <CloseButton size={"sm"} />
            </ActionBar.CloseTrigger>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </ActionBar.Root>
    ),
  },

  cursor_tooltip: {
    key: "cursor_tooltip",
    title: "CursorTooltip",
    category: "Overlay",
    description:
      "Tooltip yang mengikuti posisi kursor, untuk area besar seperti peta atau chart. Hanya satu CursorTooltip aktif dalam satu waktu. Seperti Tooltip, tidak untuk informasi yang harus terbaca di perangkat sentuh.",
    importPath:
      'import { CursorTooltip } from "@/design-system/components/overlay/cursor-tooltip/cursor-tooltip";',
    component: CursorTooltip,
    defaultProps: { content: "Kandang A · 12 ekor", openDelay: 0 },
    propsSpec: [
      {
        name: "content",
        type: "ReactNode",
        defaultValue: "Kandang A · 12 ekor",
        description: "Isi tooltip.",
        controlKind: "text",
      },
      {
        name: "openDelay",
        type: "number",
        defaultValue: 0,
        description: "Jeda sebelum muncul (ms).",
        controlKind: "number",
      },
      {
        name: "offset",
        type: "{ x: number; y: number }",
        description: "Jarak tooltip dari kursor.",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Matikan tooltip.",
      },
    ],
    renderPlayground: (props) => (
      <CursorTooltip content={String(props.content ?? "")} openDelay={Number(props.openDelay) || 0}>
        <Center w={"full"} maxW={"420px"} h={"180px"} bg={"bg.subtle"} rounded={"md"} cursor={"crosshair"}>
          <VStack gap={1}>
            <P fontSize={"sm"}>{"Arahkan kursor ke area ini"}</P>
          </VStack>
        </Center>
      </CursorTooltip>
    ),
  },
};
