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
import { BellIcon, HomeIcon, PawPrintIcon, ScanLineIcon, SettingsIcon, SyringeIcon, WheatIcon } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/design-system/components/branding/logo/logo";
import { Snackbar } from "@/design-system/components/navigation/snackbar/snackbar";
import { HStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Sidebar } from "@/design-system/components/navigation/sidebar/sidebar";
import { VNavs } from "@/design-system/components/navigation/v-navs/v-navs";
import { VScrollContainer } from "@/design-system/components/layout/scroll-container/scroll-container";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { BellRingIcon, CircleUserIcon, ClipboardCheckIcon, HouseIcon, Settings2Icon } from "lucide-react";
import { Breadcrumb } from "@/design-system/components/disclosure/breadcrumb/breadcrumb";
import { ExternalLink } from "@/design-system/components/navigation/link/link";

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
  const [activeKey, setActiveKey] =
    useState<(typeof DEMO_NAV_KEYS)[number]>("home");

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
  const [activeKey, setActiveKey] =
    useState<(typeof DEMO_NAV_KEYS)[number]>("livestock");

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
  const activeLabel = DEMO_SHELL_ITEMS.find(
    (item) => item.key === activeKey,
  )?.label;

  return (
    <Box
      w={"full"}
      h={"420px"}
      overflow={"hidden"}
      border={"1px solid"}
      borderColor={"border.subtle"}
      rounded={"md"}
    >
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
        mobileCenterAction={{
          icon: ScanLineIcon,
          label: "Scan",
          onClick: () => {},
        }}
      >
        <VStack p={4} gap={1} align={"start"}>
          <Heading size={"md"}>{activeLabel}</Heading>
          <P fontSize={"sm"} color={"fg.muted"}>
            {
              "Ubah lebar layar di bawah 720 px untuk melihat layout mobile dengan Snackbar."
            }
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
        description:
          "Definisi tiap item: ikon, judul atau `titleKey`, dan pathname.",
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
      'Button untuk item navigasi: rata kiri, ikon dan label dengan jarak tetap. Dipakai oleh Sidebar, VNavs, dan CommonAppShell. Tandai item aktif dengan `aria-current="page"`.',
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
        {
          attribute: 'aria-current="page"',
          description: "Wajib pada item yang sedang aktif.",
        },
      ],
    },
    generateCode: (props) => `<NavButton
  icon={HomeIcon}
  label={"Beranda"}
  active={active === "home"}
  variant={"${String(props.variant || "subtle")}"}
  onClick={() => setActive("home")}
/>`,
    renderPlayground: (props) => (
      <NavButtonDemo variant={String(props.variant || "subtle")} />
    ),
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
        description:
          "Tujuan navigasi: `key`, `label`, `icon`, `badge` opsional.",
      },
      {
        name: "activeKey",
        type: "string",
        description: "Item yang sedang aktif.",
      },
      {
        name: "onNavigate",
        type: "(key: string) => void",
        description:
          "Dipanggil saat item dipilih; lakukan navigasi router di sini.",
      },
      {
        name: "brand",
        type: "ReactNode",
        description: "Brand di sidebar dan header mobile. Default `Logo`.",
      },
      {
        name: "headerEnd",
        type: "ReactNode",
        description:
          "Slot kanan header mobile, misalnya notifikasi atau profil.",
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
        description:
          "Kontrol layer di kanan atas peta, misalnya MapLayerManagementPanel.",
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
        description:
          "Nav map yang dicocokkan dengan pathname. Default nav map app.",
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
      <Box
        w={"full"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        rounded={"md"}
      >
        <AppNavTitle
          navsMap={{
            docs: {
              pathname: "/design-system/ui",
              titleKey: "app.navs.profile",
            },
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
      <Box
        w={"full"}
        border={"1px solid"}
        borderColor={"border.subtle"}
        rounded={"md"}
      >
        <HeaderContainer>
          <Heading size={"md"}>{"Daftar Ternak"}</Heading>
          <IconButton variant={"ghost"} aria-label={"Notifikasi"}>
            <AppIcon icon={BellIcon} />
          </IconButton>
        </HeaderContainer>
      </Box>
    ),
  },

  snackbar: {
    key: "snackbar",
    title: "Snackbar",
    category: "Navigation",
    description:
      "Bottom navigation untuk mobile. Di Exium, Snackbar adalah navigasi bawah, bukan pesan sementara; untuk pesan pakai Toast. Safe area iPhone dan sembunyi otomatis saat keyboard terbuka.",
    importPath:
      'import { Snackbar } from "@/design-system/components/navigation/snackbar/snackbar";',
    component: Snackbar,
    defaultProps: { itemCount: 4, withCenterAction: true },
    propsSpec: [
      {
        name: "items",
        type: "{ key; label; icon; badge? }[]",
        description:
          "3 sampai 5 item. Lebih dari 5, sisanya masuk menu Lainnya.",
      },
      {
        name: "activeKey / onSelect",
        type: "string / (key: string) => void",
        description: "Controlled; app yang melakukan navigasi.",
      },
      {
        name: "centerAction",
        type: "{ icon; label; onClick }",
        description: "Tombol utama di tengah, misalnya Scan.",
      },
      {
        name: "safeArea",
        type: "boolean",
        defaultValue: true,
        description: "Padding bawah env(safe-area-inset-bottom).",
      },
      {
        name: "hideOnKeyboard",
        type: "boolean",
        defaultValue: true,
        description: "Sembunyi saat keyboard virtual terbuka.",
      },
      {
        name: "itemCount",
        type: "number",
        defaultValue: 4,
        description: "Hanya untuk playground.",
        controlKind: "select",
        options: [3, 4, 5, 6],
      },
      {
        name: "withCenterAction",
        type: "boolean",
        defaultValue: true,
        description: "Hanya untuk playground.",
        controlKind: "boolean",
      },
    ],
    generateCode: (props) => `<Button
  onClick={() =>
    snackbar.create({
      title: "${String(props.title || "Notifikasi")}",
      type: "${String(props.type || "info")}",
    })
  }
>
  {"Tampilkan Snackbar"}
</Button>`,
    renderPlayground: (props) => <SnackbarPlaygroundDemo {...props} />,
  },

  breadcrumb: {
    key: "breadcrumb",
    title: "Breadcrumb",
    category: "Navigation",
    description:
      "Navigasi remah roti untuk menunjukkan hierarki rute halaman pengguna.",
    importPath:
      'import { Breadcrumb } from "@/design-system/components/disclosure/breadcrumb/breadcrumb";',
    component: Breadcrumb.Root,
    defaultProps: {
      separator: "/",
      size: "md",
    },
    propsSpec: [
      {
        name: "separator",
        type: "string",
        defaultValue: "/",
        description: "Karakter pemisah antar tingkatan navigasi.",
        controlKind: "text",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: "md",
        description: "Ukuran teks breadcrumb.",
        controlKind: "select",
        options: ["sm", "md", "lg"],
      },
    ],
    renderPlayground: (props) => (
      <Breadcrumb.Root size={(props.size as "sm" | "md" | "lg") || "md"}>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href={"#"}>Beranda</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>
            {String(props.separator || "/")}
          </Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.Link href={"#"}>Manajemen Data</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>
            {String(props.separator || "/")}
          </Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Spasial</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    ),
  },

  sidebar: {
    key: "sidebar",
    title: "Sidebar",
    category: "Navigation",
    description:
      "Bilah navigasi samping vertikal dengan toggle perluasan (expand/collapse) dan penyimpanan state.",
    importPath:
      'import { Sidebar } from "@/design-system/components/navigation/sidebar/sidebar";\nimport { usePersistedState } from "@/design-system/hooks/use-persisted-state";',
    component: Sidebar.Root,
    defaultProps: {
      expanded: true,
      expandable: true,
    },
    propsSpec: [
      {
        name: "expanded",
        type: "boolean",
        defaultValue: true,
        description: "Status buka/tutup bilah navigasi sidebar.",
        controlKind: "boolean",
      },
      {
        name: "expandable",
        type: "boolean",
        defaultValue: true,
        description: "Aktifkan kemampuan expand & collapse sidebar.",
        controlKind: "boolean",
      },
      {
        name: "expandedWidth",
        type: "number",
        defaultValue: 240,
        description: "Lebar saat sidebar dalam keadaan expanded.",
        controlKind: "number",
      },
    ],
    generateCode: (props) => {
      const isExpandable = props.expandable !== false;
      const isExpanded = Boolean(props.expanded);
      const expandedW = Number(props.expandedWidth) || 240;

      return `// 1. Simpan status buka/tutup komponen dengan persisted state hook (key bebas)
const [isOpened, setIsOpened] = usePersistedState<boolean>(
  "app-sidebar",
  ${isExpanded}
);

// 2. Hubungkan ke Sidebar.Root lewat controlled props
<Sidebar.Root
  expandable={${isExpandable}}
  expanded={isOpened}
  onExpandedChange={setIsOpened}
  expandedWidth={${expandedW}}
>
  <Sidebar.Header>
    <HStack align={"center"} justify={"space-between"} w={"full"}>
      <HStack align={"center"} gap={2}>
        <Logo boxSize={18} ml={1.5} flexShrink={0} />
        {isOpened && (
          <P lineClamp={1} fontSize={"lg"} fontWeight={"semibold"}
            {"exium"}
          </P>
        )}
      </HStack>
      {isOpened && (
        <P lineClamp={1} mr={1} fontSize={"sm"} color={"fg.subtle"} lineHeight={1}
          {"v1.0"}
        </P>
      )}
    </HStack>
  </Sidebar.Header>

  <Sidebar.Body>
    <VScrollContainer>
      <VNavs
        flex={1}
        groups={navGroups}
        navs={navsMap}
        activeKey={activeNavKey}
        expanded={isOpened}
        onNavClick={setActiveNavKey}
        p={3}
      />
    </VScrollContainer>
  </Sidebar.Body>
</Sidebar.Root>`;
    },
    renderPlayground: (props, onPropChange) => {
      const isExpanded = Boolean(props.expanded);
      const isExpandable = Boolean(props.expandable);

      return (
        <SidebarPlaygroundDemo
          expanded={isExpanded}
          expandable={isExpandable}
          expandedWidth={Number(props.expandedWidth) || 240}
          onExpandedChange={(next) => onPropChange?.("expanded", next)}
        />
      );
    },
  },

  v_navs: {
    key: "v_navs",
    title: "VNavs",
    category: "Navigation",
    description:
      "Navigasi hierarkis vertikal berlapis dengan dukungan pengelompokan (groups), sub-nav collapsible bertingkat, dan mode collapsed/rail.",
    importPath:
      'import { VNavs } from "@/design-system/components/navigation/v-navs/v-navs";',
    component: VNavs,
    defaultProps: {
      expanded: true,
    },
    propsSpec: [
      {
        name: "expanded",
        type: "boolean",
        defaultValue: true,
        description:
          "Status buka/tutup label navigasi (true: full, false: rail).",
        controlKind: "boolean",
      },
    ],
    generateCode: (props) => {
      const isExpanded = Boolean(props.expanded);
      return `<VNavs
  flex={1}
  groups={[
    {
      title: "Menu Utama",
      items: [
        { key: "home" },
        {
          key: "projects",
          children: [{ key: "active_projects" }, { key: "archived_projects" }],
        },
      ],
    },
    {
      title: "Preferensi",
      items: [{ key: "settings" }],
    },
  ]}
  navs={{
    home: { title: "Beranda", icon: HomeIcon },
    projects: { title: "Proyek", icon: FolderIcon },
    active_projects: { title: "Proyek Aktif" },
    archived_projects: { title: "Arsip Proyek" },
    settings: { title: "Pengaturan", icon: SettingsIcon },
  }}
  activeKey={"home"}
  expanded={${isExpanded}}
  onNavClick={(key) => handleSelectNav(key)}
  p={2}
/>`;
    },
    renderPlayground: (props) => {
      const isExpanded = Boolean(props.expanded);
      return <VNavsPlaygroundDemo expanded={isExpanded} />;
    },
  },

  link: {
    key: "link",
    title: "Link",
    category: "Navigation",
    description:
      "Tautan eksternal dengan target _blank dan styling underline saat di-hover.",
    importPath:
      'import { ExternalLink } from "@/design-system/components/navigation/link/link";',
    component: ExternalLink,
    defaultProps: {
      href: "https://youtube.com",
      children: "Youtube",
    },
    propsSpec: [
      {
        name: "href",
        type: "string",
        defaultValue: undefined,
        required: true,
        description: "Alamat URL tujuan tautan (wajib).",
        controlKind: "text",
      },
      {
        name: "children",
        type: "ReactNode",
        defaultValue: undefined,
        required: true,
        description: "Teks atau elemen anak tautan.",
        controlKind: "text",
      },
      {
        name: "target",
        type: '"_blank" | "_self"',
        defaultValue: "_blank",
        description: "Target pembukaan link browser.",
        controlKind: "select",
        options: ["_blank", "_self"],
      },
    ],
    renderPlayground: (props) => (
      <ExternalLink href={String(props.href || "https://youtube.com")}>
        {String(props.children || "Youtube")}
      </ExternalLink>
    ),
  },
};

const SNACKBAR_DEMO_ITEMS = [
  { key: "home", label: "Beranda", icon: HouseIcon },
  { key: "animals", label: "Ternak", icon: PawPrintIcon, badge: 3 },
  { key: "tasks", label: "Tugas", icon: ClipboardCheckIcon },
  { key: "notifications", label: "Notifikasi", icon: BellRingIcon, badge: 12 },
  { key: "profile", label: "Profil", icon: CircleUserIcon },
  { key: "settings", label: "Pengaturan", icon: Settings2Icon },
];

const SnackbarPlaygroundDemo = (props: Record<string, unknown>) => {
  // States
  const [activeKey, setActiveKey] = useState("home");

  return (
    <Box
      w={"full"}
      maxW={"420px"}
      borderWidth={"1px"}
      rounded={"lg"}
      overflow={"hidden"}
    >
      <Snackbar
        items={SNACKBAR_DEMO_ITEMS.slice(0, Number(props.itemCount) || 4)}
        activeKey={activeKey}
        onSelect={setActiveKey}
        safeArea={false}
        hideOnKeyboard={false}
        centerAction={
          props.withCenterAction === false
            ? undefined
            : { icon: ScanLineIcon, label: "Scan", onClick: () => undefined }
        }
      />
    </Box>
  );
};

const SidebarPlaygroundDemo = ({
  expanded,
  expandable,
  expandedWidth,
  onExpandedChange,
}: {
  expanded: boolean;
  expandable: boolean;
  expandedWidth: number;
  onExpandedChange?: (next: boolean) => void;
}) => {
  const [activeNavKey, setActiveNavKey] = useState("home");
  const { theme } = useThemeStore();

  return (
    <Box
      w={"full"}
      h={"360px"}
      border={"1px solid"}
      borderColor={"border.subtle"}
      rounded={"md"}
      bg={"bg.canvas"}
      display={"flex"}
      alignItems={"stretch"}
      justifyContent={"start"}
      overflow={"hidden"}
      pos={"relative"}
    >
      <Sidebar.Root
        sidebarKey={"demo-playground-sidebar"}
        expandable={expandable}
        expanded={expanded}
        onExpandedChange={onExpandedChange}
        expandedWidth={expandedWidth}
        h={"full"}
      >
        <Sidebar.Header>
          <HStack align={"center"} justify={"space-between"} w={"full"}>
            <HStack align={"center"} gap={2}>
              <Logo boxSize={18} ml={1.5} flexShrink={0} />

              <P
                lineClamp={1}
                w={expanded ? "" : 0}
                fontSize={"lg"}
                fontWeight={"semibold"}
                color={`${theme.colorPalette}.fg`}
                mb={"3px"}
              >
                {"exium"}
              </P>
            </HStack>

            <P
              lineClamp={1}
              w={expanded ? "" : 0}
              mr={1}
              fontSize={"sm"}
              transition={"200ms"}
              color={"fg.subtle"}
              lineHeight={1}
            >
              {"v1.0"}
            </P>
          </HStack>
        </Sidebar.Header>

        <Sidebar.Body>
          <VScrollContainer>
            <VNavs
              flex={1}
              groups={DEMO_NAV_GROUPS}
              navs={DEMO_NAVS_MAP}
              activeKey={activeNavKey}
              expanded={expanded}
              onNavClick={setActiveNavKey}
              p={3}
            />
          </VScrollContainer>
        </Sidebar.Body>
      </Sidebar.Root>

      {/* Simulated content area */}
      <Box
        flex={1}
        p={6}
        bg={"bg.subtle"}
        display={"flex"}
        flexDirection={"column"}
        gap={4}
      >
        <HStack justify={"space-between"} align={"center"}>
          <P fontWeight={"semibold"} fontSize={"md"}>
            {"Area Konten Utama"}
          </P>
          <Badge colorPalette={"blue"} variant={"subtle"}>
            {`Navigasi Aktif: ${DEMO_NAVS_MAP[activeNavKey]?.title ?? activeNavKey}`}
          </Badge>
        </HStack>
        <P fontSize={"sm"} color={"fg.muted"}>
          {
            "Sidebar dan VNavs memiliki proporsi padding (p={3}), header default, logo branding, serta pemisah yang identik dengan navigasi dokumentasi sistem."
          }
        </P>
      </Box>
    </Box>
  );
};

const VNavsPlaygroundDemo = ({ expanded }: { expanded: boolean }) => {
  const [activeNavKey, setActiveNavKey] = useState("home");

  return (
    <Box
      w={"full"}
      maxW={"300px"}
      h={"360px"}
      border={"1px solid"}
      borderColor={"border.subtle"}
      rounded={"md"}
      bg={"bg.body"}
      overflow={"hidden"}
    >
      <VScrollContainer>
        <VNavs
          flex={1}
          groups={DEMO_NAV_GROUPS}
          navs={DEMO_NAVS_MAP}
          activeKey={activeNavKey}
          expanded={expanded}
          onNavClick={setActiveNavKey}
          p={3}
        />
      </VScrollContainer>
    </Box>
  );
};

const DEMO_NAVS_MAP: Record<string, { title: string; path: string }> = {
  home: { title: "Beranda", path: "/home" },
  settings: { title: "Pengaturan", path: "/settings" },
  profile: { title: "Profil", path: "/profile" },
};
const DEMO_NAV_GROUPS = [
  {
    groupLabel: "Utama",
    items: [{ key: "home" }, { key: "settings" }, { key: "profile" }],
  },
];
