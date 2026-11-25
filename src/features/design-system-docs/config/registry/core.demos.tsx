import { Logo } from "@/design-system/components/branding/logo/logo";
import { Button } from "@/design-system/components/button/button/button";
import { Snackbar } from "@/design-system/components/navigation/snackbar/snackbar";
import type { FormattedListItem, FormattedTableHeader } from "@/design-system/components/data-display/data-view/data-view-table.type";
import type { DataViewBatchActionsGenerator, DataViewItemActionsGenerator } from "@/design-system/components/data-display/data-view/data-view.type";
import { DataViewFooter } from "@/design-system/components/data-display/data-view/data-view-footer";
import { DataViewTable } from "@/design-system/components/data-display/data-view/data-view-table";
import { ConfirmationTrigger } from "@/design-system/components/feedback/confirmation-trigger/confirmation-trigger";
import { FocusAlertItem } from "@/design-system/components/focus-alert/focus-alert/focus-alert";
import { FocusSelectInput } from "@/design-system/components/input/focus-select/focus-select";
import SelectInput from "@/design-system/components/input/select/select";
import { Box } from "@/design-system/components/layout/box/box";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Sidebar } from "@/design-system/components/navigation/sidebar/sidebar";
import { VNavs } from "@/design-system/components/navigation/v-navs/v-navs";
import { VScrollContainer } from "@/design-system/components/layout/scroll-container/scroll-container";
import { useThemeStore } from "@/design-system/stores/theme-store";
import type { NavGroup, NavItem } from "@/shared/types/nav.type";
import { usePopModal } from "@/design-system/components/overlay/hooks/use-pop-modal";
import { Dialog } from "@/design-system/components/overlay/dialog/dialog";
import { Drawer } from "@/design-system/components/overlay/drawer/drawer";
import { Modal } from "@/design-system/components/overlay/modal/modal";
import { toast } from "@/design-system/components/toast";
import { Badge } from "@/design-system/components/typography/badge/badge";
import { P } from "@/design-system/components/typography/p/p";
import type { TableDemoItem } from "@/features/design-system-docs/types/ds-docs-spec.type";
import { BellRingIcon, CircleUserIcon, ClipboardCheckIcon, EditIcon, EyeIcon, FolderIcon, HomeIcon, HouseIcon, LayersIcon, PawPrintIcon, ScanLineIcon, Settings2Icon, SettingsIcon, Trash2Icon, UserIcon } from "lucide-react";
import { useMemo, useState } from "react";

export const SnackbarPlaygroundDemo = (props: Record<string, unknown>) => {
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

export const SelectPlaygroundDemo = (props: Record<string, unknown>) => {
  return (
    <Box w={"260px"}>
      <SelectInput
        placeholder={String(props.placeholder || "Pilih opsi...")}
        size={(props.size as "sm" | "md" | "lg") || "md"}
        disabled={Boolean(props.disabled)}
        options={[
          { label: "Opsi 1", value: "opt1" },
          { label: "Opsi 2", value: "opt2" },
          { label: "Opsi 3", value: "opt3" },
        ]}
      />
    </Box>
  );
};

export const FocusSelectPlaygroundDemo = (props: Record<string, unknown>) => {
  return (
    <Box w={"260px"}>
      <FocusSelectInput
        modalKey={"docs-focus-select-demo"}
        placeholder={String(props.placeholder || "Pilih opsi...")}
        size={(props.size as "sm" | "md" | "lg") || "md"}
        clearable={Boolean(props.clearable)}
        disabled={Boolean(props.disabled)}
        isFetching={Boolean(props.isFetching)}
        isError={Boolean(props.isError)}
        options={[
          {
            label: "Opsi 1",
            value: "opt1",
            description: "Deskripsi opsi pertama",
          },
          {
            label: "Opsi 2",
            value: "opt2",
            description: "Deskripsi opsi kedua",
          },
          {
            label: "Opsi 3",
            value: "opt3",
            description: "Deskripsi opsi ketiga",
          },
        ]}
      />
    </Box>
  );
};

export const FocusAlertPlaygroundDemo = (props: Record<string, unknown>) => {
  const { modalKey, open } = usePopModal({ modalKey: "docs-focus-alert-demo" });
  return (
    <VStack gap={3}>
      <Button variant={"outline"} onClick={() => open()}>
        Buka Focus Alert
      </Button>

      <FocusAlertItem
        modalKey={modalKey}
        variant={(props.variant as "neutral") || "neutral"}
        title={"Perhatian Penting"}
        description={
          "Tindakan ini memerlukan perhatian khusus dan konfirmasi pengguna."
        }
      />
    </VStack>
  );
};

const ALL_DEMO_ITEMS: FormattedListItem<TableDemoItem>[] = [
  {
    id: "1",
    data: { name: "Ahmad Dahlan", role: "Surveyor", status: "Aktif" },
    columns: [
      { value: "Ahmad Dahlan", td: "Ahmad Dahlan" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "2",
    data: { name: "Budi Santoso", role: "Verifikator", status: "Pending" },
    columns: [
      { value: "Budi Santoso", td: "Budi Santoso" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "3",
    data: { name: "Citra Lestari", role: "Administrator", status: "Nonaktif" },
    columns: [
      { value: "Citra Lestari", td: "Citra Lestari" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "4",
    data: { name: "Dedi Supriadi", role: "Petugas Ukur", status: "Aktif" },
    columns: [
      { value: "Dedi Supriadi", td: "Dedi Supriadi" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "5",
    data: { name: "Eka Wulandari", role: "Validator", status: "Pending" },
    columns: [
      { value: "Eka Wulandari", td: "Eka Wulandari" },
      { value: "Validator", td: "Validator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "6",
    data: { name: "Fajar Pratama", role: "Surveyor", status: "Nonaktif" },
    columns: [
      { value: "Fajar Pratama", td: "Fajar Pratama" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "7",
    data: { name: "Gita Permata", role: "Verifikator", status: "Aktif" },
    columns: [
      { value: "Gita Permata", td: "Gita Permata" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "8",
    data: { name: "Hadi Kusuma", role: "Administrator", status: "Pending" },
    columns: [
      { value: "Hadi Kusuma", td: "Hadi Kusuma" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "9",
    data: { name: "Indra Wijaya", role: "Petugas Ukur", status: "Nonaktif" },
    columns: [
      { value: "Indra Wijaya", td: "Indra Wijaya" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "10",
    data: { name: "Joko Susilo", role: "Validator", status: "Aktif" },
    columns: [
      { value: "Joko Susilo", td: "Joko Susilo" },
      { value: "Validator", td: "Validator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "11",
    data: { name: "Kartika Sari", role: "Surveyor", status: "Pending" },
    columns: [
      { value: "Kartika Sari", td: "Kartika Sari" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "12",
    data: { name: "Lukman Hakim", role: "Verifikator", status: "Nonaktif" },
    columns: [
      { value: "Lukman Hakim", td: "Lukman Hakim" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "13",
    data: { name: "Maya Anggraini", role: "Administrator", status: "Aktif" },
    columns: [
      { value: "Maya Anggraini", td: "Maya Anggraini" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "14",
    data: { name: "Nanda Pratama", role: "Petugas Ukur", status: "Pending" },
    columns: [
      { value: "Nanda Pratama", td: "Nanda Pratama" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "15",
    data: { name: "Oki Setiawan", role: "Validator", status: "Nonaktif" },
    columns: [
      { value: "Oki Setiawan", td: "Oki Setiawan" },
      { value: "Validator", td: "Validator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "16",
    data: { name: "Putri Rahayu", role: "Surveyor", status: "Aktif" },
    columns: [
      { value: "Putri Rahayu", td: "Putri Rahayu" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "17",
    data: { name: "Qori Fadilah", role: "Verifikator", status: "Pending" },
    columns: [
      { value: "Qori Fadilah", td: "Qori Fadilah" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "18",
    data: { name: "Rian Hidayat", role: "Administrator", status: "Nonaktif" },
    columns: [
      { value: "Rian Hidayat", td: "Rian Hidayat" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "19",
    data: { name: "Siti Nurhaliza", role: "Petugas Ukur", status: "Aktif" },
    columns: [
      { value: "Siti Nurhaliza", td: "Siti Nurhaliza" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "20",
    data: { name: "Teguh Wibowo", role: "Validator", status: "Pending" },
    columns: [
      { value: "Teguh Wibowo", td: "Teguh Wibowo" },
      { value: "Validator", td: "Validator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "21",
    data: { name: "Umar Said", role: "Surveyor", status: "Nonaktif" },
    columns: [
      { value: "Umar Said", td: "Umar Said" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "22",
    data: { name: "Vina Panduwinata", role: "Verifikator", status: "Aktif" },
    columns: [
      { value: "Vina Panduwinata", td: "Vina Panduwinata" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "23",
    data: { name: "Wahyu Nugroho", role: "Administrator", status: "Pending" },
    columns: [
      { value: "Wahyu Nugroho", td: "Wahyu Nugroho" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "24",
    data: { name: "Xavier Pratama", role: "Petugas Ukur", status: "Nonaktif" },
    columns: [
      { value: "Xavier Pratama", td: "Xavier Pratama" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "25",
    data: { name: "Yusuf Mansur", role: "Validator", status: "Aktif" },
    columns: [
      { value: "Yusuf Mansur", td: "Yusuf Mansur" },
      { value: "Validator", td: "Validator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "26",
    data: { name: "Zainal Arifin", role: "Surveyor", status: "Pending" },
    columns: [
      { value: "Zainal Arifin", td: "Zainal Arifin" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "27",
    data: { name: "Agus Setiawan", role: "Verifikator", status: "Nonaktif" },
    columns: [
      { value: "Agus Setiawan", td: "Agus Setiawan" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "28",
    data: { name: "Bayu Wicaksono", role: "Administrator", status: "Aktif" },
    columns: [
      { value: "Bayu Wicaksono", td: "Bayu Wicaksono" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "29",
    data: { name: "Cindy Claudia", role: "Petugas Ukur", status: "Pending" },
    columns: [
      { value: "Cindy Claudia", td: "Cindy Claudia" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "30",
    data: { name: "Doni Salmanan", role: "Validator", status: "Nonaktif" },
    columns: [
      { value: "Doni Salmanan", td: "Doni Salmanan" },
      { value: "Validator", td: "Validator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "31",
    data: { name: "Endang Suherman", role: "Surveyor", status: "Aktif" },
    columns: [
      { value: "Endang Suherman", td: "Endang Suherman" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "32",
    data: { name: "Firman Utina", role: "Verifikator", status: "Pending" },
    columns: [
      { value: "Firman Utina", td: "Firman Utina" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "33",
    data: { name: "Guntur Triyoga", role: "Administrator", status: "Nonaktif" },
    columns: [
      { value: "Guntur Triyoga", td: "Guntur Triyoga" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "34",
    data: { name: "Hesti Purwadinata", role: "Petugas Ukur", status: "Aktif" },
    columns: [
      { value: "Hesti Purwadinata", td: "Hesti Purwadinata" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "35",
    data: { name: "Iman Santoso", role: "Validator", status: "Pending" },
    columns: [
      { value: "Iman Santoso", td: "Iman Santoso" },
      { value: "Validator", td: "Validator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "36",
    data: { name: "Julia Perez", role: "Surveyor", status: "Nonaktif" },
    columns: [
      { value: "Julia Perez", td: "Julia Perez" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "37",
    data: { name: "Kevin Sanjaya", role: "Verifikator", status: "Aktif" },
    columns: [
      { value: "Kevin Sanjaya", td: "Kevin Sanjaya" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "38",
    data: { name: "Lilis Karlina", role: "Administrator", status: "Pending" },
    columns: [
      { value: "Lilis Karlina", td: "Lilis Karlina" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "39",
    data: { name: "Mirza Ghulam", role: "Petugas Ukur", status: "Nonaktif" },
    columns: [
      { value: "Mirza Ghulam", td: "Mirza Ghulam" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "40",
    data: { name: "Nadia Vega", role: "Validator", status: "Aktif" },
    columns: [
      { value: "Nadia Vega", td: "Nadia Vega" },
      { value: "Validator", td: "Validator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "41",
    data: { name: "Onky Alexander", role: "Surveyor", status: "Pending" },
    columns: [
      { value: "Onky Alexander", td: "Onky Alexander" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "42",
    data: {
      name: "Panji Trihatmodjo",
      role: "Verifikator",
      status: "Nonaktif",
    },
    columns: [
      { value: "Panji Trihatmodjo", td: "Panji Trihatmodjo" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "43",
    data: { name: "Queen Latifah", role: "Administrator", status: "Aktif" },
    columns: [
      { value: "Queen Latifah", td: "Queen Latifah" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "44",
    data: { name: "Raffi Ahmad", role: "Petugas Ukur", status: "Pending" },
    columns: [
      { value: "Raffi Ahmad", td: "Raffi Ahmad" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "45",
    data: { name: "Sule Prikitiew", role: "Validator", status: "Nonaktif" },
    columns: [
      { value: "Sule Prikitiew", td: "Sule Prikitiew" },
      { value: "Validator", td: "Validator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "46",
    data: { name: "Taufik Hidayat", role: "Surveyor", status: "Aktif" },
    columns: [
      { value: "Taufik Hidayat", td: "Taufik Hidayat" },
      { value: "Surveyor", td: "Surveyor" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "47",
    data: { name: "Uut Permatasari", role: "Verifikator", status: "Pending" },
    columns: [
      { value: "Uut Permatasari", td: "Uut Permatasari" },
      { value: "Verifikator", td: "Verifikator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
  {
    id: "48",
    data: { name: "Vicky Prasetyo", role: "Administrator", status: "Nonaktif" },
    columns: [
      { value: "Vicky Prasetyo", td: "Vicky Prasetyo" },
      { value: "Administrator", td: "Administrator" },
      {
        value: "Nonaktif",
        td: <Badge colorPalette={"gray"}>Nonaktif</Badge>,
      },
    ],
  },
  {
    id: "49",
    data: { name: "Wulan Guritno", role: "Petugas Ukur", status: "Aktif" },
    columns: [
      { value: "Wulan Guritno", td: "Wulan Guritno" },
      { value: "Petugas Ukur", td: "Petugas Ukur" },
      {
        value: "Aktif",
        td: <Badge colorPalette={"green"}>Aktif</Badge>,
      },
    ],
  },
  {
    id: "50",
    data: { name: "Yayan Ruhian", role: "Validator", status: "Pending" },
    columns: [
      { value: "Yayan Ruhian", td: "Yayan Ruhian" },
      { value: "Validator", td: "Validator" },
      {
        value: "Pending",
        td: <Badge colorPalette={"orange"}>Pending</Badge>,
      },
    ],
  },
];

export const DataTablePlaygroundDemo = ({
  props,
  onPropChange,
}: {
  props?: Record<string, unknown>;
  onPropChange?: (name: string, value: unknown) => void;
}) => {
  // Props
  const withNumbering =
    props?.withNumbering !== undefined ? Boolean(props.withNumbering) : true;
  const withStickyMenu =
    props?.withStickyMenu !== undefined ? Boolean(props.withStickyMenu) : false;
  const canBatchSelect =
    props?.canBatchSelect !== undefined ? Boolean(props.canBatchSelect) : true;
  const fixedItemHeight =
    props?.fixedItemHeight !== undefined
      ? Boolean(props.fixedItemHeight)
      : true;
  const rawPage = Number(props?.page) || 1;
  const page = Math.max(1, rawPage);
  const pageSize = Math.max(1, Number(props?.pageSize) || 20);

  // Handlers (sync page / pageSize back to playground knobs)
  const setPage = (nextPage: number) => {
    const validPage = Math.max(1, nextPage);
    onPropChange?.("page", validPage);
  };

  const setPageSize = (nextSize: number) => {
    onPropChange?.("pageSize", nextSize);
    onPropChange?.("page", 1);
  };

  // Pagination Slice
  const startIndex = (page - 1) * pageSize;
  const paginatedItems = ALL_DEMO_ITEMS.slice(
    startIndex,
    startIndex + pageSize,
  );
  const totalPage = Math.ceil(ALL_DEMO_ITEMS.length / pageSize);

  // Derived Values — Single useMemo for DataList Table Pattern
  const dataList = useMemo(
    () => ({
      headers: [
        { th: "Nama", sortable: true },
        { th: "Peran", sortable: true },
        { th: "Status", sortable: false },
      ] as FormattedTableHeader[],
      items: paginatedItems,
      batchActions: [] as DataViewBatchActionsGenerator<TableDemoItem>[],
      itemActions: [
        {
          key: "view",
          label: "Lihat Detail",
          icon: EyeIcon,
          onClick: (item: TableDemoItem) => {
            toast.info(`Melihat data ${item.name}`);
          },
        },
        {
          key: "edit",
          label: "Edit Data",
          icon: EditIcon,
          onClick: (item: TableDemoItem) => {
            toast.info(`Mengedit data ${item.name}`);
          },
        },
        {
          key: "delete",
          label: "Hapus",
          icon: Trash2Icon,
          colorPalette: "red",
          modal: {
            triggerComponent: (item: TableDemoItem) => (
              <ConfirmationTrigger
                modalKey={`docs-table-delete-${item.name}`}
                title={"Hapus Data"}
                description={`Data ${item.name} akan dihapus secara permanen dan tidak dapat dibatalkan.`}
                confirmLabel={"Hapus"}
                colorPalette={"red"}
                onConfirm={() => {
                  toast.success(`Data ${item.name} berhasil dihapus.`);
                }}
              />
            ),
          },
        },
      ] as DataViewItemActionsGenerator<TableDemoItem>[],
    }),
    [paginatedItems],
  );

  return (
    <VStack w={"full"} maxW={"650px"} gap={0} align={"stretch"}>
      <DataViewTable.Root
        headers={dataList.headers}
        items={dataList.items}
        itemActions={dataList.itemActions}
        batchActions={dataList.batchActions}
        withNumbering={withNumbering}
        withStickyMenu={withStickyMenu}
        canBatchSelect={canBatchSelect}
        fixedItemHeight={fixedItemHeight}
        page={page}
        pageSize={pageSize}
      >
        <DataViewTable.Header />
        <DataViewTable.Body />
      </DataViewTable.Root>

      <DataViewFooter
        currentDataLength={dataList.items.length}
        totalData={ALL_DEMO_ITEMS.length}
        totalPage={totalPage}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </VStack>
  );
};

export const DrawerPlaygroundDemo = (props?: Record<string, unknown>) => {
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

export const DialogPlaygroundDemo = (props?: Record<string, unknown>) => {
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

export const ModalPlaygroundDemo = ({
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

const DEMO_NAV_GROUPS: NavGroup[] = [
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
    title: "Sistem",
    items: [
      {
        key: "organization",
        children: [{ key: "members" }, { key: "roles" }],
      },
      { key: "settings" },
    ],
  },
];

const DEMO_NAVS_MAP: Record<string, NavItem> = {
  home: {
    title: "Beranda",
    icon: HomeIcon,
  },
  projects: {
    title: "Proyek",
    icon: FolderIcon,
  },
  active_projects: {
    title: "Proyek Aktif",
  },
  archived_projects: {
    title: "Arsip Proyek",
  },
  organization: {
    title: "Organisasi",
    icon: LayersIcon,
  },
  members: {
    title: "Anggota",
    icon: UserIcon,
  },
  roles: {
    title: "Peran Akses",
  },
  settings: {
    title: "Pengaturan",
    icon: SettingsIcon,
  },
};

export const SidebarPlaygroundDemo = ({
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

export const VNavsPlaygroundDemo = ({ expanded }: { expanded: boolean }) => {
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

const SNACKBAR_DEMO_ITEMS = [
  { key: "home", label: "Beranda", icon: HouseIcon },
  { key: "animals", label: "Ternak", icon: PawPrintIcon, badge: 3 },
  { key: "tasks", label: "Tugas", icon: ClipboardCheckIcon },
  { key: "notifications", label: "Notifikasi", icon: BellRingIcon, badge: 12 },
  { key: "profile", label: "Profil", icon: CircleUserIcon },
  { key: "settings", label: "Pengaturan", icon: Settings2Icon },
];
