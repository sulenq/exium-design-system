import { Button } from "@/design-system/components/button/button/button";
import { CloseButton } from "@/design-system/components/button/close-button/close-button";
import { Center } from "@/design-system/components/layout/center/center";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { ActionBar } from "@/design-system/components/overlay/action-bar/action-bar";
import { CursorTooltip } from "@/design-system/components/overlay/cursor-tooltip/cursor-tooltip";
import { List } from "@/design-system/components/typography/list/list";
import { P } from "@/design-system/components/typography/p/p";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { useState } from "react";

// -------------------------------------------------------------------------------------
// Demo data
// -------------------------------------------------------------------------------------

const ActionBarPlaygroundDemo = () => {
  // States
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant={"outline"} onClick={() => setOpen((prev) => !prev)}>
        {open ? "Tutup ActionBar" : "Buka ActionBar (3 dipilih)"}
      </Button>
      <ActionBar.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        closeOnInteractOutside={false}
      >
        <ActionBar.Positioner>
          <ActionBar.Content>
            <P fontSize={"sm"} px={2}>
              {"3 ternak dipilih"}
            </P>
            <ActionBar.Separator />
            <Button size={"sm"}>{"Jadwalkan vaksin"}</Button>
            <ActionBar.CloseTrigger asChild>
              <CloseButton size={"sm"} />
            </ActionBar.CloseTrigger>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </ActionBar.Root>
    </>
  );
};

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
    generateCode: (props) => `<List.Root as={"${props.ordered ? "ol" : "ul"}"} gap={2} ps={5} maxW={"420px"}>
  {DEMO_LIST_ITEMS.map((item) => (
    <List.Item key={item}>{item}</List.Item>
  ))}
</List.Root>`,
    renderPlayground: (props) => (
      <List.Root as={props.ordered ? "ol" : "ul"} gap={2} ps={5} maxW={"420px"}>
        {DEMO_LIST_ITEMS.map((item) => (
          <List.Item key={item}>{item}</List.Item>
        ))}
      </List.Root>
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
    defaultProps: {},
    propsSpec: [
      {
        name: "open",
        type: "boolean",
        description: "Tampilkan bar.",
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
    generateCode: () => `<ActionBar.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
  <ActionBar.Positioner>
    <ActionBar.Content>
      <P fontSize={"sm"} px={2}>{"3 ternak dipilih"}</P>
      <ActionBar.Separator />
      <Button size={"sm"}>{"Jadwalkan vaksin"}</Button>
      <ActionBar.CloseTrigger asChild>
        <CloseButton size={"sm"} />
      </ActionBar.CloseTrigger>
    </ActionBar.Content>
  </ActionBar.Positioner>
</ActionBar.Root>`,
    renderPlayground: () => <ActionBarPlaygroundDemo />,
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
    generateCode: (props) => {
      const delay = Number(props.openDelay) || 0;
      const delayProp = delay !== 0 ? ` openDelay={${delay}}` : "";
      return `<CursorTooltip content={"${String(props.content ?? "")}"}${delayProp}>
  <Center w={"full"} maxW={"420px"} h={"180px"} bg={"bg.subtle"} rounded={"md"} cursor={"crosshair"}>
    <VStack gap={1}>
      <P fontSize={"sm"}>{"Arahkan kursor ke area ini"}</P>
    </VStack>
  </Center>
</CursorTooltip>`;
    },
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
