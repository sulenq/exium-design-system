import { Button } from "@/design-system/components/button/button/button";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { usePopModal } from "@/design-system/components/overlay/hooks/use-pop-modal";
import { Dialog } from "@/design-system/components/overlay/dialog/dialog";
import { Drawer } from "@/design-system/components/overlay/drawer/drawer";
import { Modal } from "@/design-system/components/overlay/modal/modal";
import { P } from "@/design-system/components/typography/p/p";
import { InfoTip, ToggleTip } from "@/design-system/components/input/toggle-tip/toggle-tip";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Menu } from "@/design-system/components/overlay/menu/menu";
import { Popover } from "@/design-system/components/overlay/popover/popover";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { CaretDownIcon } from "@phosphor-icons/react";

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
            Buka Menu Pilihan <AppIcon icon={CaretDownIcon} size={"sm"} />
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


const DrawerPlaygroundDemo = (props?: Record<string, unknown>) => {
  const placement =
    (props?.placement as "start" | "end" | "top" | "bottom") || "end";
  const size =
    (props?.size as "xs" | "sm" | "md" | "lg" | "xl" | "full") || "xs";

  const { modalKey, isOpen, open, close } = usePopModal({
    modalKey: "docs-drawer",
  });
  return (
    <Drawer.Root
      modalKey={modalKey}
      opened={isOpen}
      open={open}
      close={close}
      placement={placement}
      size={size}
    >
      <Drawer.Trigger asChild>
        <Button variant={"outline"}>Buka Drawer Samping</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <P fontWeight={"bold"} fontSize={"lg"}>
            Drawer Exium
          </P>
        </Drawer.Header>
        <Drawer.Body>
          <VStack gap={4}>
            <P color={"fg.muted"}>
              Panel geser samping untuk form, filter detail, atau konfigurasi
              sekunder aplikasi.
            </P>
            <P color={"fg.muted"}>
              Desain sistem Exium menyediakan drawer dengan adaptasi responsif,
              gesture swipe to dismiss pada mobile, dan integrasi riwayat URL.
            </P>
            <P color={"fg.muted"}>
              Konten panjang ini disiapkan untuk mendemonstrasikan scroll
              container di dalam body drawer, menjaga header dan footer tetap
              terpasang rapi (fixed).
            </P>
            <P color={"fg.muted"}>
              Baris tambahan 1: Navigasi URL otomatis menyinkronkan query param
              overlay sehingga tombol back pada peramban berfungsi secara
              native.
            </P>
            <P color={"fg.muted"}>
              Baris tambahan 2: Ukuran default menggunakan token xs yang kompak,
              elegan, dan proporsional untuk formulir data entri.
            </P>
            <P color={"fg.muted"}>
              Baris tambahan 3: Tombol aksi pada footer diatur full-width agar
              mudah dijangkau oleh pengguna baik di desktop maupun layar sentuh.
            </P>
          </VStack>
        </Drawer.Body>
        <Drawer.Footer>
          <Button w={"full"} variant={"outline"} onClick={close}>
            Tutup Drawer
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
};


const DialogPlaygroundDemo = (props?: Record<string, unknown>) => {
  const size =
    (props?.size as "xs" | "sm" | "md" | "lg" | "xl" | "full") || "xs";
  const placement = (props?.placement as "center" | "top") || "center";
  const scrollBehavior =
    (props?.scrollBehavior as "inside" | "outside") || "inside";

  const { modalKey, isOpen, open, close } = usePopModal({
    modalKey: "docs-dialog",
  });

  return (
    <Dialog.Root
      modalKey={modalKey}
      opened={isOpen}
      open={open}
      close={close}
      size={size}
      placement={placement}
      scrollBehavior={scrollBehavior}
    >
      <Dialog.Trigger asChild>
        <Button variant={"outline"}>Buka Dialog Preview</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <P fontSize={"lg"} fontWeight={"bold"} textAlign={"center"}>
            Exium Dialog Title
          </P>
        </Dialog.Header>
        <Dialog.Body>
          <VStack gap={4}>
            <P color={"fg.muted"}>
              Ini adalah contoh dialog modal terpusat dari Exium Design System
              dengan animasi origin klik halus dan backdrop blur.
            </P>
            <P color={"fg.muted"}>
              Dengan opsi scrollBehavior={scrollBehavior}, jika konten di dalam
              body melebihi batas ketinggian viewport, scroll container internal
              akan aktif secara otomatis tanpa merusak tata letak dialog.
            </P>
            <P color={"fg.muted"}>
              Scroll test paragraf 1: Exium Design System mengutamakan
              konsistensi UX pada overlay dengan menyinkronkan state ke query
              param URL ?overlay=.
            </P>
            <P color={"fg.muted"}>
              Scroll test paragraf 2: Setiap modal anak yang bersarang (nested)
              mewarisi prefix induk dengan notasi titik (.childKey) agar tidak
              memicu unmount pada dialog induk.
            </P>
            <P color={"fg.muted"}>
              Scroll test paragraf 3: Ukuran modal standar kini menggunakan
              default xs untuk tampilan yang ringkas, bersih, dan fokus pada
              konten esensial.
            </P>
            <P color={"fg.muted"}>
              Scroll test paragraf 4: Tombol aksi utama maupun pembatalan di
              area footer menggunakan lebar penuh (full width) untuk ergonomi
              klik maksimal.
            </P>
          </VStack>
        </Dialog.Body>
        <Dialog.Footer>
          <Button w={"full"} variant={"outline"} onClick={close}>
            Tutup Dialog
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};


const ModalPlaygroundDemo = ({
  size = "xs",
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}) => {
  const { modalKey, isOpen, open, close } = usePopModal({
    modalKey: "docs-modal",
  });

  const childModal = usePopModal({
    modalKey: `${modalKey}.child`,
  });

  return (
    <>
      <Modal.Root
        modalKey={modalKey}
        opened={isOpen}
        open={open}
        close={close}
        size={size}
      >
        <Modal.Trigger asChild>
          <Button variant={"outline"}>Buka Modal Adaptif</Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title
              textAlign={"center"}
              fontWeight={"bold"}
              fontSize={"lg"}
            >
              Exium Adaptive Modal (Parent)
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <VStack gap={4}>
              <P color={"fg.muted"}>
                Modal adaptif Exium secara cerdas merender komponen Dialog
                mengambang pada layar desktop, dan otomatis bertransformasi
                menjadi Drawer geser bawah pada layar ponsel.
              </P>
              <P color={"fg.muted"}>
                Coba buka child modal bersarang (nested) di bawah ini untuk
                menguji urutan z-index, stack backdrop, dan ketahanan saat
                browser di-refresh.
              </P>
              <Button
                variant={"solid"}
                primary
                onClick={() => childModal.open()}
              >
                Buka Nested Child Modal
              </Button>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button w={"full"} variant={"outline"} onClick={close}>
              Tutup Modal Parent
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>

      {/* Nested Child Modal */}
      <Modal.Root
        modalKey={childModal.modalKey}
        opened={childModal.isOpen}
        open={childModal.open}
        close={childModal.close}
        size={"xs"}
      >
        <Modal.Content>
          <Modal.Header>
            <Modal.Title
              textAlign={"center"}
              fontWeight={"bold"}
              fontSize={"lg"}
            >
              Nested Child Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <VStack gap={3} textAlign={"center"}>
              <P color={"fg.muted"}>
                Ini adalah modal anak bersarang dengan key:
              </P>
              <P fontWeight={"semibold"} color={"fg.default"}>
                {childModal.modalKey}
              </P>
              <P fontSize={"sm"} color={"fg.subtle"}>
                Backdrop dan dialog anak selalu berada di atas modal induk, baik
                saat dibuka interaktif maupun saat di-refresh pada URL langsung
                (?overlay=docs-modal.child).
              </P>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              w={"full"}
              variant={"solid"}
              primary
              onClick={childModal.close}
            >
              Tutup Child Modal
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

