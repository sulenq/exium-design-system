import { SnackbarPlaygroundDemo, SidebarPlaygroundDemo, VNavsPlaygroundDemo } from "@/features/design-system-docs/config/registry/core.demos";
import { Snackbar } from "@/design-system/components/navigation/snackbar/snackbar";
import { Breadcrumb } from "@/design-system/components/disclosure/breadcrumb/breadcrumb";
import { ExternalLink } from "@/design-system/components/navigation/link/link";
import { Sidebar } from "@/design-system/components/navigation/sidebar/sidebar";
import { VNavs } from "@/design-system/components/navigation/v-navs/v-navs";
import type { ComponentDocSpec } from "@/features/design-system-docs/types/ds-docs-spec.type";

export const NAVIGATION_CORE_DOCS: Record<string, ComponentDocSpec> = {

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
