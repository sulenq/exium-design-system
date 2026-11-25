import { DrawerPlaygroundDemo, DialogPlaygroundDemo, ModalPlaygroundDemo } from "@/features/design-system-docs/config/registry/core.demos";
import { Button } from "@/design-system/components/button/button/button";
import { InfoTip, ToggleTip } from "@/design-system/components/input/toggle-tip/toggle-tip";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Dialog } from "@/design-system/components/overlay/dialog/dialog";
import { Drawer } from "@/design-system/components/overlay/drawer/drawer";
import { Menu } from "@/design-system/components/overlay/menu/menu";
import { Modal } from "@/design-system/components/overlay/modal/modal";
import { Popover } from "@/design-system/components/overlay/popover/popover";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import { P } from "@/design-system/components/typography/p/p";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { ChevronDownIcon } from "lucide-react";

export const OVERLAY_DOCS: Record<string, ComponentDocSpec> = {

  toggle_tip: {
    key: "toggle_tip",
    title: "ToggleTip",
    category: "Overlay",
    description:
      "Info yang dibuka dengan tap atau klik. Pakai ini, bukan Tooltip, untuk informasi yang harus terbaca di perangkat sentuh.",
    importPath:
      'import { ToggleTip } from "@/design-system/components/input/toggle-tip/toggle-tip";',
    component: ToggleTip,
    defaultProps: {
      content: "Masa henti obat dihitung sejak tanggal pemberian.",
    },
    propsSpec: [
      {
        name: "content",
        type: "ReactNode",
        defaultValue: "Masa henti obat dihitung sejak tanggal pemberian.",
        description: "Isi info.",
        controlKind: "text",
      },
      {
        name: "showArrow",
        type: "boolean",
        description: "Tampilkan panah popover.",
        controlKind: "boolean",
      },
    ],
    generateCode: (props) => `<InfoTip
  content={"${String(props.content || "")}"}
  showArrow={${Boolean(props.showArrow)}}
/>`,
    renderPlayground: (props) => (
      <InfoTip
        content={String(props.content || "")}
        showArrow={Boolean(props.showArrow)}
      />
    ),
  },


  dialog: {
    key: "dialog",
    title: "Dialog Modal",
    category: "Overlay",
    description:
      "Komponen modal mengambang dengan transisi, backdrop, dan kontrol tombol tutup.",
    importPath:
      'import { Dialog } from "@/design-system/components/overlay/dialog/dialog";',
    component: Dialog.Root,
    defaultProps: {
      size: "xs",
      placement: "center",
      scrollBehavior: "inside",
    },
    propsSpec: [
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "full"',
        defaultValue: "xs",
        description: "Ukuran lebar modal dialog.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl", "full"],
      },
      {
        name: "placement",
        type: '"center" | "top"',
        defaultValue: "center",
        description: "Posisi peletakan dialog pada layar.",
        controlKind: "select",
        options: ["center", "top"],
      },
      {
        name: "scrollBehavior",
        type: '"inside" | "outside"',
        defaultValue: "inside",
        description: "Perilaku scroll konten jika melebihi tinggi layar.",
        controlKind: "select",
        options: ["inside", "outside"],
      },
    ],
    renderPlayground: (props) => <DialogPlaygroundDemo {...props} />,
  },


  drawer: {
    key: "drawer",
    title: "Drawer",
    category: "Overlay",
    description:
      "Panel geser dari tepi layar untuk form samping, filter, atau menu sekunder.",
    importPath:
      'import { Drawer } from "@/design-system/components/overlay/drawer/drawer";',
    component: Drawer.Root,
    defaultProps: {
      placement: "end",
      size: "xs",
    },
    propsSpec: [
      {
        name: "placement",
        type: '"start" | "end" | "top" | "bottom"',
        defaultValue: "end",
        description: "Sisi tepi layar tempat drawer muncul.",
        controlKind: "select",
        options: ["start", "end", "top", "bottom"],
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "full"',
        defaultValue: "xs",
        description: "Dimensi ketebalan drawer.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl", "full"],
      },
    ],
    generateCode: (
      props,
    ) => `<Drawer.Root modalKey={"docs-drawer"} placement={"${String(props.placement || "end")}"}>
  <Drawer.Trigger asChild>
    <Button variant={"outline"}>{"Buka Drawer"}</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>{"Judul Drawer"}</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>{"Isi drawer."}</Drawer.Body>
  </Drawer.Content>
</Drawer.Root>`,
    renderPlayground: (props) => <DrawerPlaygroundDemo {...props} />,
  },


  popover: {
    key: "popover",
    title: "Popover",
    category: "Overlay",
    description: "Panel mengambang interaktif terikat pada elemen pemicu.",
    importPath:
      'import { Popover } from "@/design-system/components/overlay/popover/popover";',
    component: Popover.Root,
    defaultProps: {
      modal: false,
      portalled: true,
    },
    propsSpec: [
      {
        name: "modal",
        type: "boolean",
        defaultValue: false,
        description: "Cegah interaksi di luar area popover saat terbuka.",
        controlKind: "boolean",
      },
      {
        name: "portalled",
        type: "boolean",
        defaultValue: true,
        description: "Render popover ke dalam portal body terpisah.",
        controlKind: "boolean",
      },
    ],
    renderPlayground: (props) => (
      <Popover.Root
        modal={Boolean(props.modal)}
        portalled={Boolean(props.portalled)}
      >
        <Popover.Trigger asChild>
          <Button variant={"outline"}>Klik Popover</Button>
        </Popover.Trigger>
        <Popover.Content maxW={"260px"}>
          <Popover.Header>
            <P fontWeight={"bold"}>Detail Info</P>
          </Popover.Header>
          <Popover.Body>
            <P fontSize={"sm"} color={"fg.muted"}>
              Ini adalah konten informasi di dalam Popover floating box.
            </P>
          </Popover.Body>
        </Popover.Content>
      </Popover.Root>
    ),
  },


  tooltip: {
    key: "tooltip",
    title: "Tooltip",
    category: "Overlay",
    description:
      "Pesan informasi singkat saat pengguna mengarahkan kursor (hover) di atas elemen.",
    importPath:
      'import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";',
    component: Tooltip,
    defaultProps: {
      content: "Tooltip info bantuan",
      disabled: false,
      openDelay: 300,
      closeDelay: 200,
    },
    propsSpec: [
      {
        name: "content",
        type: "ReactNode",
        defaultValue: undefined,
        required: true,
        description: "Teks atau konten isi tooltip (wajib).",
        controlKind: "text",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Nonaktifkan tampilan tooltip.",
        controlKind: "boolean",
      },
      {
        name: "openDelay",
        type: "number",
        defaultValue: 300,
        description: "Jeda waktu buka tooltip (ms).",
        controlKind: "number",
      },
      {
        name: "closeDelay",
        type: "number",
        defaultValue: 200,
        description: "Jeda waktu tutup tooltip (ms).",
        controlKind: "number",
      },
    ],
    renderPlayground: (props) => (
      <Tooltip
        key={`tooltip-${Boolean(props.disabled)}`}
        content={String(props.content || "Tooltip info bantuan")}
        disabled={Boolean(props.disabled)}
        openDelay={Number(props.openDelay) || 300}
        closeDelay={Number(props.closeDelay) || 200}
      >
        <Button variant={"outline"}>
          {props.disabled ? "Tooltip Dinonaktifkan" : "Arahkan Mouse ke Sini"}
        </Button>
      </Tooltip>
    ),
  },


  menu: {
    key: "menu",
    title: "Menu",
    category: "Overlay",
    description:
      "Menu dropdown aksi pilihan dengan navigasi keyboard dan pemisahan kategori.",
    importPath:
      'import { Menu } from "@/design-system/components/overlay/menu/menu";',
    component: Menu.Root,
    defaultProps: {
      size: "md",
      variant: "subtle",
    },
    propsSpec: [
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: "md",
        description: "Ukuran item menu.",
        controlKind: "select",
        options: ["sm", "md"],
      },
      {
        name: "variant",
        type: '"subtle" | "solid"',
        defaultValue: "subtle",
        description: "Gaya visual latar menu terpilih.",
        controlKind: "select",
        options: ["subtle", "solid"],
      },
    ],
    renderPlayground: (props) => (
      <Menu.Root
        size={(props.size as "sm" | "md") || "md"}
        variant={(props.variant as "subtle" | "solid") || "subtle"}
      >
        <Menu.Trigger asChild>
          <Button variant={"outline"}>
            Buka Menu Pilihan <AppIcon icon={ChevronDownIcon} size={"sm"} />
          </Button>
        </Menu.Trigger>
        <Menu.Content minW={"160px"}>
          <Menu.Item value={"profile"}>Profil Saya</Menu.Item>
          <Menu.Item value={"settings"}>Pengaturan</Menu.Item>
          <Menu.Item value={"logout"} color={"fg.error"}>
            Keluar
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>
    ),
  },


  modal: {
    key: "modal",
    title: "Modal (Adaptive)",
    category: "Overlay",
    description:
      "Komponen overlay pintar adaptif: otomatis menjadi Dialog pada desktop dan Drawer bawah pada perangkat mobile.",
    importPath:
      'import { Modal } from "@/design-system/components/overlay/modal/modal";',
    component: Modal.Root,
    defaultProps: {
      size: "xs",
    },
    propsSpec: [
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl" | "full"',
        defaultValue: "xs",
        description:
          "Ukuran lebar modal saat ditampilkan dalam mode dialog desktop.",
        controlKind: "select",
        options: ["xs", "sm", "md", "lg", "xl", "full"],
      },
    ],
    renderPlayground: (props) => (
      <ModalPlaygroundDemo
        size={(props.size as "xs" | "sm" | "md" | "lg" | "xl" | "full") || "xs"}
      />
    ),
  },

};
