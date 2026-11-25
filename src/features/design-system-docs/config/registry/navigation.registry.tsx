// src/features/design-system-docs/config/registry/navigation.registry.tsx

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Box } from "@/design-system/components/layout/box/box";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { HNavs } from "@/design-system/components/navigation/h-navs/h-navs";
import { NavButton } from "@/design-system/components/navigation/nav/nav";
import { AppNavTitle } from "@/design-system/components/shell/app-nav-title/app-nav-title";
import { CommonAppShell } from "@/design-system/components/shell/common-app-shell/common-app-shell";
import { GisAppShell } from "@/design-system/components/shell/gis-app-shell/gis-app-shell";
import { HeaderContainer } from "@/design-system/components/shell/header-container/header-container";
import { Heading } from "@/design-system/components/typography/heading/heading";
import { P } from "@/design-system/components/typography/p/p";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";
import type { NavItem } from "@/shared/types/nav.type";
import {
  BellIcon,
  HomeIcon,
  PawPrintIcon,
  ScanLineIcon,
  SettingsIcon,
  SyringeIcon,
  WheatIcon,
} from "lucide-react";
import { useState } from "react";

// -------------------------------------------------------------------------------------
// Demo data
// -------------------------------------------------------------------------------------

const DEMO_NAV_KEYS = ["home", "livestock", "health", "feed"] as const;

const DEMO_NAVS: Record<(typeof DEMO_NAV_KEYS)[number], NavItem> = {
  home: { icon: HomeIcon, title: "Beranda" },
  livestock: { icon: PawPrintIcon, title: "Ternak" },
  health: { icon: SyringeIcon, title: "Kesehatan" },
  feed: { icon: WheatIcon, title: "Pakan" },
};

const DEMO_SHELL_ITEMS = [
  { key: "home", label: "Beranda", icon: HomeIcon },
  { key: "livestock", label: "Ternak", icon: PawPrintIcon, badge: 2 },
  { key: "health", label: "Kesehatan", icon: SyringeIcon },
  { key: "feed", label: "Pakan", icon: WheatIcon },
];

// -------------------------------------------------------------------------------------
// Demo components
// -------------------------------------------------------------------------------------

const HNavsDemo = () => {
  // States
  const [activeKey, setActiveKey] = useState<(typeof DEMO_NAV_KEYS)[number]>("home");

  return (
    <Box w={"full"} maxW={"420px"}>
      <HNavs<(typeof DEMO_NAV_KEYS)[number]>
        navs={DEMO_NAVS}
        navKeys={[...DEMO_NAV_KEYS]}
        activeKey={activeKey}
        onNavClick={setActiveKey}
      />
    </Box>
  );
};

const NavButtonDemo = (props: { variant: string }) => {
  // Props
  const { variant } = props;

  // States
  const [activeKey, setActiveKey] = useState<(typeof DEMO_NAV_KEYS)[number]>("livestock");

  return (
    <VStack w={"full"} maxW={"240px"} gap={1} align={"stretch"} as={"nav"}>
      {DEMO_NAV_KEYS.map((key) => (
        <NavButton
          key={key}
          variant={key === activeKey ? (variant as "subtle") : "ghost"}
          aria-current={key === activeKey ? "page" : undefined}
          onClick={() => setActiveKey(key)}
        >
          <AppIcon icon={DEMO_NAVS[key].icon} />
          {DEMO_NAVS[key].title}
        </NavButton>
      ))}
    </VStack>
  );
};

const CommonAppShellDemo = () => {
  // States
  const [activeKey, setActiveKey] = useState("home");

  // Derived Values
  const activeLabel = DEMO_SHELL_ITEMS.find((item) => item.key === activeKey)?.label;

  return (
    <Box w={"full"} h={"420px"} overflow={"hidden"} border={"1px solid"} borderColor={"border.subtle"} rounded={"md"}>
      <CommonAppShell
        h={"full"}
        minH={0}
        navItems={DEMO_SHELL_ITEMS}
        activeKey={activeKey}
        onNavigate={setActiveKey}
        headerEnd={
          <IconButton variant={"ghost"} aria-label={"Notifikasi"}>
            <AppIcon icon={BellIcon} />
          </IconButton>
        }
        sidebarFooter={
          <NavButton variant={"ghost"} w={"full"}>
            <AppIcon icon={SettingsIcon} />
            {"Pengaturan"}
          </NavButton>
        }
        mobileCenterAction={{ icon: ScanLineIcon, label: "Scan", onClick: () => {} }}
      >
        <VStack p={4} gap={1} align={"start"}>
          <Heading size={"md"}>{activeLabel}</Heading>
          <P fontSize={"sm"} color={"fg.muted"}>
            {"Ubah lebar layar di bawah 720 px untuk melihat layout mobile dengan Snackbar."}
          </P>
        </VStack>
      </CommonAppShell>
    </Box>
  );
};

// -------------------------------------------------------------------------------------
// Specs
// -------------------------------------------------------------------------------------

export const NAVIGATION_DOCS: Record<string, ComponentDocSpec> = {
  h_navs: {
    key: "h_navs",
    title: "HNavs",
    category: "Navigation",
    description:
      "Navigasi horizontal yang bisa digulir, misalnya tab sub-halaman di header. Item diambil dari map `navs` dan urutannya dari `navKeys` atau `items`.",
    importPath:
      'import { HNavs } from "@/design-system/components/navigation/h-navs/h-navs";',
    component: HNavs,
    defaultProps: {},
    propsSpec: [
      {
        name: "navs",
        type: "Record<TNavKey, NavItem>",
        required: true,
        description: "Definisi tiap item: ikon, judul atau `titleKey`, dan pathname.",
      },
      {
        name: "navKeys / items",
        type: "TNavKey[] | NavNode<TNavKey>[]",
        description: "Urutan item; `items` mendukung anak bertingkat.",
      },
      {
        name: "activeKey",
        type: "TNavKey | null",
        description: "Item yang sedang aktif.",
      },
      {
        name: "onNavClick",
        type: "(key: TNavKey) => void",
        description: "Dipanggil saat item dipilih.",
      },
    ],
    generateCode: () => `<HNavs
  navGroups={DEMO_NAV_GROUPS}
  navsMap={DEMO_NAVS_MAP}
  activePath={active}
  onNavClick={(nav) => setActive(nav.pathname)}
/>`,
    renderPlayground: () => <HNavsDemo />,
  },

  nav: {
    key: "nav",
    title: "NavButton",
    category: "Navigation",
    description:
      "Button untuk item navigasi: rata kiri, ikon dan label dengan jarak tetap. Dipakai oleh Sidebar, VNavs, dan CommonAppShell. Tandai item aktif dengan `aria-current=\"page\"`.",
    importPath:
      'import { NavButton } from "@/design-system/components/navigation/nav/nav";',
    component: NavButton,
    defaultProps: { variant: "subtle" },
    propsSpec: [
      {
        name: "variant",
        type: "string",
        defaultValue: "subtle",
        description: "Variant untuk item aktif di demo.",
        controlKind: "select",
        options: ["subtle", "solid", "outline"],
      },
      {
        name: "...ButtonProps",
        type: "ButtonProps",
        description: "Semua props Button.",
      },
    ],
    a11y: {
      ariaAttributes: [
        { attribute: "aria-current=\"page\"", description: "Wajib pada item yang sedang aktif." },
      ],
    },
    generateCode: (props) => `<NavButton
  icon={HomeIcon}
  label={"Beranda"}
  active={active === "home"}
  variant={"${String(props.variant || "subtle")}"}
  onClick={() => setActive("home")}
/>`,
    renderPlayground: (props) => <NavButtonDemo variant={String(props.variant || "subtle")} />,
  },

  common_app_shell: {
    key: "common_app_shell",
    title: "CommonAppShell",
    category: "Shell",
    description:
      "App shell generik. Desktop: sidebar dengan brand, navigasi, dan slot footer. Mobile (< 720 px): header dengan brand dan slot kanan, konten scroll, dan Snackbar dari `navItems` yang sama.",
    importPath:
      'import { CommonAppShell } from "@/design-system/components/shell/common-app-shell/common-app-shell";',
    component: CommonAppShell,
    defaultProps: {},
    propsSpec: [
      {
        name: "navItems",
        type: "CommonAppShellNavItem[]",
        description: "Tujuan navigasi: `key`, `label`, `icon`, `badge` opsional.",
      },
      {
        name: "activeKey",
        type: "string",
        description: "Item yang sedang aktif.",
      },
      {
        name: "onNavigate",
        type: "(key: string) => void",
        description: "Dipanggil saat item dipilih; lakukan navigasi router di sini.",
      },
      {
        name: "brand",
        type: "ReactNode",
        description: "Brand di sidebar dan header mobile. Default `Logo`.",
      },
      {
        name: "headerEnd",
        type: "ReactNode",
        description: "Slot kanan header mobile, misalnya notifikasi atau profil.",
      },
      {
        name: "sidebarFooter",
        type: "ReactNode",
        description: "Slot bawah sidebar desktop, misalnya pengaturan.",
      },
      {
        name: "mobileCenterAction",
        type: "SnackbarAction",
        description: "Aksi utama di tengah Snackbar mobile, misalnya Scan.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Isi halaman. Default `Outlet` dari router.",
      },
    ],
    generateCode: () => `<CommonAppShell
  navGroups={DEMO_NAV_GROUPS}
  navsMap={DEMO_NAVS_MAP}
  activePath={active}
  onNavClick={(nav) => setActive(nav.pathname)}
>
  <P fontSize={"sm"} color={"fg.muted"}>
    {"Konten halaman di dalam CommonAppShell."}
  </P>
</CommonAppShell>`,
    renderPlayground: () => <CommonAppShellDemo />,
  },

  gis_app_shell: {
    key: "gis_app_shell",
    title: "GisAppShell",
    category: "Shell",
    description:
      "App shell untuk aplikasi berbasis peta: sidebar dan navigasi per role, area konten yang bisa dibagi dengan peta (Splitter), dan Snackbar di mobile. Data layer tidak di-fetch oleh shell; app mengirimnya lewat `catalogLayers`.",
    importPath:
      'import { GisAppShell } from "@/design-system/components/shell/gis-app-shell/gis-app-shell";',
    component: GisAppShell,
    defaultProps: {},
    propsSpec: [
      {
        name: "catalogLayers",
        type: "CatalogMapLayer[]",
        description:
          "Layer yang tampil di peta. Layer dengan `defaultVisible` langsung dinyalakan, dan kamera diarahkan ke layer pertama.",
      },
      {
        name: "layerManagement",
        type: "ReactNode",
        description: "Kontrol layer di kanan atas peta, misalnya MapLayerManagementPanel.",
      },
      {
        name: "...StackProps",
        type: "StackProps",
        description: "Diteruskan ke container halaman.",
      },
    ],
    generateCode: () => `<GisAppShell h={"full"} minH={0} />`,
    renderPlayground: () => (
      <Box
        pos={"relative"}
        transform={"translateZ(0)"}
        w={"full"}
        h={"520px"}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        rounded={"md"}
      >
        <GisAppShell h={"full"} minH={0} />
      </Box>
    ),
  },

  app_nav_title: {
    key: "app_nav_title",
    title: "AppNavTitle",
    category: "Shell",
    description:
      "Judul halaman di header yang diambil otomatis dari nav map berdasarkan pathname aktif, sehingga judul selalu sama dengan label menu.",
    importPath:
      'import { AppNavTitle } from "@/design-system/components/shell/app-nav-title/app-nav-title";',
    component: AppNavTitle,
    defaultProps: {},
    propsSpec: [
      {
        name: "navsMap",
        type: "Record<string, NavItem>",
        description: "Nav map yang dicocokkan dengan pathname. Default nav map app.",
      },
      {
        name: "...StackProps",
        type: "StackProps",
        description: "Diteruskan ke HeaderContainer.",
      },
    ],
    generateCode: () => `<AppNavTitle
  navsMap={{
    docs: { pathname: "/design-system/ui", titleKey: "app.navs.profile" },
  }}
  endAdornment={<Button size={"sm"} variant={"outline"}>{"Tambah"}</Button>}
/>`,
    renderPlayground: () => (
      <Box w={"full"} border={"1px solid"} borderColor={"border.subtle"} rounded={"md"}>
        <AppNavTitle
          navsMap={{
            docs: { pathname: "/design-system/ui", titleKey: "app.navs.profile" },
          }}
        />
      </Box>
    ),
  },

  header_container: {
    key: "header_container",
    title: "HeaderContainer",
    category: "Shell",
    description:
      "Baris header halaman: tinggi minimal sesuai token `headerH`, isi rata tengah vertikal, kiri-kanan dipisah.",
    importPath:
      'import { HeaderContainer } from "@/design-system/components/shell/header-container/header-container";',
    component: HeaderContainer,
    defaultProps: {},
    propsSpec: [
      {
        name: "...StackProps",
        type: "StackProps",
        description: "Semua props HStack.",
      },
    ],
    generateCode: () => `<HeaderContainer>
  <Heading size={"md"}>{"Daftar Ternak"}</Heading>
  <IconButton variant={"ghost"} aria-label={"Notifikasi"}>
    <AppIcon icon={BellIcon} />
  </IconButton>
</HeaderContainer>`,
    renderPlayground: () => (
      <Box w={"full"} border={"1px solid"} borderColor={"border.subtle"} rounded={"md"}>
        <HeaderContainer>
          <Heading size={"md"}>{"Daftar Ternak"}</Heading>
          <IconButton variant={"ghost"} aria-label={"Notifikasi"}>
            <AppIcon icon={BellIcon} />
          </IconButton>
        </HeaderContainer>
      </Box>
    ),
  },
};
