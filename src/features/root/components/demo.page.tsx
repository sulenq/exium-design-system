// src/features/root/components/demo.page.tsx

import { BrandWatermark } from "@/design-system/components/branding/ui/brand-watermark";
import { Logo } from "@/design-system/components/branding/ui/logo";
import {
  Button,
  IconButton,
} from "@/design-system/components/button/ui/button";
import { ButtonGroup } from "@/design-system/components/button/ui/button-group";
import { ColorModeToggleButton } from "@/design-system/components/button/ui/color-mode";
import type {
  DataViewBatchActionsGenerator,
  DataViewItemActionsGenerator,
} from "@/design-system/components/data-display/types/data-view.type";
import { DataViewFooter } from "@/design-system/components/data-display/ui/data-view-footer";
import { DataViewTable } from "@/design-system/components/data-display/ui/data-view-table";
import { Accordion } from "@/design-system/components/disclosure/ui/accordion";
import { Breadcrumb } from "@/design-system/components/disclosure/ui/breadcrumb";
import { Carousel } from "@/design-system/components/disclosure/ui/carousel";
import { Steps } from "@/design-system/components/disclosure/ui/steps";
import { Tabs } from "@/design-system/components/disclosure/ui/tabs";
import type { EmojiVariant } from "@/design-system/components/emoji/types/emoji.type";
import { Emoji } from "@/design-system/components/emoji/ui/emoji";
import { ConfirmationTrigger } from "@/design-system/components/feedback/ui/confirmation-trigger";
import {
  Progress,
  ProgressCircle,
} from "@/design-system/components/feedback/ui/progress";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@/design-system/components/feedback/ui/skeleton";
import { StateAccessDenied } from "@/design-system/components/feedback/ui/state.access-denied";
import { StateNoData } from "@/design-system/components/feedback/ui/state.no-data";
import { StateNoResult } from "@/design-system/components/feedback/ui/state.no-result";
import { StateRetry } from "@/design-system/components/feedback/ui/state.retry";
import { AppIcon } from "@/design-system/components/icon/ui/app-icon";
import { useExistingFiles } from "@/design-system/components/input/hooks/use-existing-files";
import { Checkbox } from "@/design-system/components/input/ui/checkbox";
import { DateInput } from "@/design-system/components/input/ui/date-input";
import { Field } from "@/design-system/components/input/ui/field";
import { FileInput } from "@/design-system/components/input/ui/file-input";
import { FocusSelectInput } from "@/design-system/components/input/ui/focus-select";
import { Input } from "@/design-system/components/input/ui/input";
import {
  NumberInput,
  SteppedNumberInput,
} from "@/design-system/components/input/ui/number-input";
import { PasswordInput } from "@/design-system/components/input/ui/password-input";
import { PinInput } from "@/design-system/components/input/ui/pin-input";
import { RadioCardInput } from "@/design-system/components/input/ui/radio-card-input";
import { RadioInput } from "@/design-system/components/input/ui/radio-input";
import { SearchInput } from "@/design-system/components/input/ui/search-input";
import Select from "@/design-system/components/input/ui/select";
import { Slider } from "@/design-system/components/input/ui/slider";
import { Switch } from "@/design-system/components/input/ui/switch";
import { Textarea } from "@/design-system/components/input/ui/textarea";
import { Box } from "@/design-system/components/layout/ui/box";
import {
  AbsoluteCenter,
  Center,
} from "@/design-system/components/layout/ui/center";
import { Container } from "@/design-system/components/layout/ui/container";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { Splitter } from "@/design-system/components/layout/ui/splitter";
import { Image } from "@/design-system/components/media/ui/image";
import { ExternalLink } from "@/design-system/components/navigation/ui/link";
import { usePopModal } from "@/design-system/components/overlay/hooks/use-pop-modal";
import { Dialog } from "@/design-system/components/overlay/ui/dialog";
import { Drawer } from "@/design-system/components/overlay/ui/drawer";
import { Modal } from "@/design-system/components/overlay/ui/modal";
import { toast } from "@/design-system/components/toast";
import { P, TNum } from "@/design-system/components/typography/ui/p";
import { RichTextEditorPresetEssential } from "@/design-system/components/typography/ui/rich-text-editor.preset";
import { Span } from "@/design-system/components/typography/ui/span";
import { DownloadTrigger } from "@/design-system/components/utilities/ui/download-trigger";
import { COLOR_PALETTES_LIST } from "@/design-system/constants/colors";
import { useSplitterStore } from "@/design-system/stores/splitter-store";
import { SettingsTrigger } from "@/features/settings/components/settings";
import { getLocale, getLocaleLabel } from "@/shared/libs/i18n";
import { useLocale } from "@/shared/libs/i18n/locale-provider";
import {
  IconArrowRight,
  IconDownload,
  IconFilter2,
  IconForbid,
  IconLanguage,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  BellIcon,
  CheckCircleIcon,
  CogIcon,
  CompassIcon,
  EyeIcon,
  FolderIcon,
  LayersIcon,
  LayoutGridIcon,
  MessageSquareIcon,
  MousePointerClickIcon,
  PaletteIcon,
  SparklesIcon,
  TableIcon,
  TextCursorInputIcon,
  EditIcon,
  TrashIcon,
  Undo2Icon,
  TypeIcon,
  UploadIcon,
  UserIcon,
  WrenchIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

// ---------------------------------------------------------------------------
// Card Shell (Atomic Container for each component)
// ---------------------------------------------------------------------------

const DemoCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: typeof MousePointerClickIcon;
  children: ReactNode;
}) => {
  return (
    <Container.Root w={"full"}>
      <Container.Body gap={3} p={4} align={"start"}>
        <HStack align={"center"} gap={2} w={"full"} pb={1}>
          {icon && <AppIcon icon={icon} size={"sm"} color={"colorPalette.fg"} />}
          <P fontSize={"sm"} fontWeight={"semibold"}>
            {title}
          </P>
        </HStack>
        <Box w={"full"}>{children}</Box>
      </Container.Body>
    </Container.Root>
  );
};

// ---------------------------------------------------------------------------
// Main Demo Page
// ---------------------------------------------------------------------------

export const DemoPage = () => {
  return (
    <VStack align={"stretch"} gap={4} w={"full"}>
      {/* Masonry Layout: Dump all individual components without grouping */}
      <Box
        w={"full"}
        css={{
          columns: "1",
          "@media (min-width: 768px)": {
            columns: "2",
          },
          "@media (min-width: 1280px)": {
            columns: "3",
          },
          columnGap: "16px",
          "& > *": {
            breakInside: "avoid",
            marginBottom: "16px",
            display: "inline-block",
            width: "100%",
          },
        }}
      >
        <ButtonCard />
        <IconButtonCard />
        <ButtonGroupCard />
        <InputCard />
        <PasswordInputCard />
        <SearchInputCard />
        <NumberInputCard />
        <SteppedNumberInputCard />
        <DateInputCard />
        <SelectCard />
        <FocusSelectCard />
        <PinInputCard />
        <CheckboxCard />
        <SwitchCard />
        <RadioInputCard />
        <RadioCardInputCard />
        <SliderCard />
        <TextareaCard />
        <FileInputDropzoneCard />
        <FileInputButtonCard />
        <RichTextEditorCard />
        <ProgressCard />
        <ProgressCircleCard />
        <SkeletonCard />
        <StateNoDataCard />
        <StateAccessDeniedCard />
        <StateNoResultCard />
        <StateRetryCard />
        <EmojiCard />
        <ToastCard />
        <ModalCard />
        <DialogCard />
        <DrawerCard />
        <AccordionCard />
        <TabsCard />
        <StepsCard />
        <BreadcrumbCard />
        <CarouselCard />
        <ExternalLinkCard />
        <TypographyCard />
        <TabularNumCard />
        <BrandingCard />
        <ColorModeAndLocaleCard />
        <UtilitiesCard />
      </Box>

      {/* Full-width expansive sections */}
      <Layout />
      <DataDisplay />
      <ColorPalettes />
    </VStack>
  );
};

// ---------------------------------------------------------------------------
// Atomic Component Cards
// ---------------------------------------------------------------------------

const ButtonCard = () => {
  return (
    <DemoCard title={"Button"} icon={MousePointerClickIcon}>
      <HStack wrap={"wrap"} align={"center"} justify={"start"} gap={2}>
        <Button primary={true}>Primary</Button>
        <Button variant={"surface"}>Surface</Button>
        <Button variant={"subtle"}>Subtle</Button>
        <Button variant={"outline"}>Outline</Button>
        <Button>Ghost</Button>
      </HStack>
    </DemoCard>
  );
};

const IconButtonCard = () => {
  return (
    <DemoCard title={"IconButton"} icon={MousePointerClickIcon}>
      <HStack wrap={"wrap"} align={"center"} justify={"start"} gap={2}>
        <IconButton primary={true}>
          <AppIcon icon={IconPlus} />
        </IconButton>
        <IconButton variant={"surface"}>
          <AppIcon icon={IconDownload} />
        </IconButton>
        <IconButton variant={"subtle"}>
          <AppIcon icon={IconFilter2} />
        </IconButton>
        <IconButton variant={"outline"}>
          <AppIcon icon={IconTrash} />
        </IconButton>
      </HStack>
    </DemoCard>
  );
};

const ButtonGroupCard = () => {
  return (
    <DemoCard title={"ButtonGroup"} icon={MousePointerClickIcon}>
      <VStack align={"start"} gap={2}>
        <ButtonGroup attached={true}>
          <Button variant={"outline"}>Left</Button>
          <Button variant={"outline"}>Middle</Button>
          <Button variant={"outline"}>Right</Button>
        </ButtonGroup>
      </VStack>
    </DemoCard>
  );
};

const ColorModeAndLocaleCard = () => {
  // Hooks
  const { setLocale } = useLocale();

  return (
    <DemoCard title={"Theme & Locale"} icon={CogIcon}>
      <HStack wrap={"wrap"} align={"center"} justify={"start"} gap={2}>
        <SettingsTrigger modalKey={"settings"} w={"fit"}>
          <IconButton>
            <AppIcon icon={CogIcon} strokeWidth={1.3} size={"lg"} />
          </IconButton>
        </SettingsTrigger>

        <ColorModeToggleButton />

        <Button
          onClick={() => {
            setLocale(getLocale() === "id" ? "en" : "id");
          }}
        >
          <AppIcon icon={IconLanguage} />
          {getLocaleLabel(getLocale())}
        </Button>
      </HStack>
    </DemoCard>
  );
};

const BrandingCard = () => {
  return (
    <DemoCard title={"Logo & Watermark"} icon={SparklesIcon}>
      <VStack align={"start"} gap={3}>
        <Logo />
        <BrandWatermark />
      </VStack>
    </DemoCard>
  );
};

const TypographyCard = () => {
  return (
    <DemoCard title={"Typography (P)"} icon={TypeIcon}>
      <VStack align={"start"} gap={1}>
        <P color={"fg.solid"}>{"Solid text color"}</P>
        <P color={"fg.emphasized"}>{"Emphasized text color"}</P>
        <P color={"fg.muted"}>{"Muted text color"}</P>
        <P color={"fg.subtle"}>{"Subtle text color"}</P>
      </VStack>
    </DemoCard>
  );
};

const TabularNumCard = () => {
  // States
  const [tnum, setTnum] = useState<number>(10);

  return (
    <DemoCard title={"Tabular Num (TNum)"} icon={TypeIcon}>
      <HStack align={"center"} gap={4}>
        <VStack align={"start"} gap={1}>
          <HStack align={"center"} justify={"space-between"} gap={3}>
            <P fontSize={"sm"}>Normal num:</P>
            <P fontSize={"sm"}>{tnum}</P>
          </HStack>

          <HStack align={"center"} justify={"space-between"} gap={3}>
            <P fontSize={"sm"}>Tabular num:</P>
            <TNum fontSize={"sm"}>{tnum}</TNum>
          </HStack>
        </VStack>

        <Button
          size={"xs"}
          variant={"outline"}
          onClick={() => setTnum((p) => p + 1)}
        >
          + 1
        </Button>
      </HStack>
    </DemoCard>
  );
};

const InputCard = () => {
  return (
    <DemoCard title={"Input"} icon={TextCursorInputIcon}>
      <VStack align={"stretch"} gap={2}>
        <Field label={"Text Input"}>
          <Input placeholder={"Ketik sesuatu..."} />
        </Field>
      </VStack>
    </DemoCard>
  );
};

const PasswordInputCard = () => {
  return (
    <DemoCard title={"PasswordInput"} icon={TextCursorInputIcon}>
      <Field label={"Password Input"}>
        <PasswordInput withPasswordStrength={true} placeholder={"Kata sandi..."} />
      </Field>
    </DemoCard>
  );
};

const SearchInputCard = () => {
  return (
    <DemoCard title={"SearchInput"} icon={TextCursorInputIcon}>
      <SearchInput placeholder={"Cari data..."} />
    </DemoCard>
  );
};

const NumberInputCard = () => {
  return (
    <DemoCard title={"NumberInput"} icon={TextCursorInputIcon}>
      <Field label={"Nominal"}>
        <NumberInput
          placeholder={"0"}
          formatOptions={{
            style: "unit",
            unit: "inch",
            unitDisplay: "long",
          }}
        />
      </Field>
    </DemoCard>
  );
};

const SteppedNumberInputCard = () => {
  return (
    <DemoCard title={"SteppedNumberInput"} icon={TextCursorInputIcon}>
      <SteppedNumberInput />
    </DemoCard>
  );
};

const DateInputCard = () => {
  return (
    <DemoCard title={"DateInput"} icon={TextCursorInputIcon}>
      <Field label={"Pilih Tanggal"}>
        <DateInput
          modalKey={"demo-date-input"}
          datePickerSubtitle={"Pilih tanggal jadwal"}
        />
      </Field>
    </DemoCard>
  );
};

const SelectCard = () => {
  return (
    <DemoCard title={"Select Input"} icon={TextCursorInputIcon}>
      <Field label={"Pilihan Status"}>
        <Select
          options={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
            { label: "Option 3", value: "option-3" },
          ]}
        />
      </Field>
    </DemoCard>
  );
};

const FocusSelectCard = () => {
  return (
    <DemoCard title={"FocusSelectInput"} icon={TextCursorInputIcon}>
      <Field label={"Focus Select"}>
        <FocusSelectInput
          options={[
            { label: "Kategori A", value: "kat-a" },
            { label: "Kategori B", value: "kat-b" },
            { label: "Kategori C", value: "kat-c" },
          ]}
        />
      </Field>
    </DemoCard>
  );
};

const PinInputCard = () => {
  return (
    <DemoCard title={"PinInput (OTP)"} icon={TextCursorInputIcon}>
      <VStack align={"start"} gap={2}>
        <PinInput count={4} />
      </VStack>
    </DemoCard>
  );
};

const CheckboxCard = () => {
  return (
    <DemoCard title={"Checkbox"} icon={TextCursorInputIcon}>
      <HStack wrap={"wrap"} align={"center"} justify={"start"} gap={4}>
        <Checkbox defaultChecked={true}>Aktif</Checkbox>
        <Checkbox>Pilihan Tambahan</Checkbox>
      </HStack>
    </DemoCard>
  );
};

const SwitchCard = () => {
  return (
    <DemoCard title={"Switch"} icon={TextCursorInputIcon}>
      <HStack wrap={"wrap"} align={"center"} justify={"start"} gap={4}>
        <Switch defaultChecked={true}>Notifikasi Email</Switch>
        <Switch>Mode Gelap</Switch>
      </HStack>
    </DemoCard>
  );
};

const RadioInputCard = () => {
  return (
    <DemoCard title={"RadioInput"} icon={TextCursorInputIcon}>
      <RadioInput
        options={[
          { label: "Pilihan Utama", value: "utama" },
          { label: "Pilihan Kedua", value: "kedua" },
        ]}
      />
    </DemoCard>
  );
};

const RadioCardInputCard = () => {
  return (
    <DemoCard title={"RadioCardInput"} icon={TextCursorInputIcon}>
      <RadioCardInput.Root defaultValue={"option-1"}>
        <HStack gap={3} w={"full"}>
          <RadioCardInput.Item value={"option-1"} flex={1}>
            <RadioCardInput.ItemControl>
              <VStack gap={1} align={"start"}>
                <AppIcon
                  icon={IconArrowRight}
                  size={"lg"}
                  color={"fg.muted"}
                  mb={1}
                />
                <RadioCardInput.ItemText>Opsi 1</RadioCardInput.ItemText>
                <RadioCardInput.ItemDescription>
                  Penjelasan singkat opsi 1
                </RadioCardInput.ItemDescription>
              </VStack>
              <RadioCardInput.ItemIndicator />
            </RadioCardInput.ItemControl>
          </RadioCardInput.Item>

          <RadioCardInput.Item value={"option-2"} flex={1}>
            <RadioCardInput.ItemControl>
              <VStack gap={1} align={"start"}>
                <AppIcon
                  icon={IconForbid}
                  size={"lg"}
                  color={"fg.muted"}
                  mb={1}
                />
                <RadioCardInput.ItemText>Opsi 2</RadioCardInput.ItemText>
                <RadioCardInput.ItemDescription>
                  Penjelasan singkat opsi 2
                </RadioCardInput.ItemDescription>
              </VStack>
              <RadioCardInput.ItemIndicator />
            </RadioCardInput.ItemControl>
          </RadioCardInput.Item>
        </HStack>
      </RadioCardInput.Root>
    </DemoCard>
  );
};

const SliderCard = () => {
  return (
    <DemoCard title={"Slider"} icon={TextCursorInputIcon}>
      <Slider defaultValue={[45]} w={"full"} />
    </DemoCard>
  );
};

const TextareaCard = () => {
  return (
    <DemoCard title={"Textarea"} icon={TextCursorInputIcon}>
      <Field label={"Catatan Tambahan"}>
        <Textarea placeholder={"Tuliskan deskripsi atau catatan..."} maxLength={200} />
      </Field>
    </DemoCard>
  );
};

// ---------------------------------------------------------------------------
// FileInput: Clean dropzone & trigger button without dimension issues
// ---------------------------------------------------------------------------

const FileInputDropzoneCard = () => {
  // Hooks
  const { register } = useForm();
  const apiResponse = [
    {
      attachment_id: "att_001",
      file_name: "dokumen-legal.pdf",
      file_size: 8000,
      file_url: "https://cdn.example.com/files/dokumen-legal.pdf",
      content_type: "application/pdf",
    },
  ];

  const { existingFiles, toggleMarkedForDelete } = useExistingFiles({
    initialExistingFiles: apiResponse.map((att) => ({
      id: att.attachment_id,
      name: att.file_name,
      size: att.file_size,
      url: att.file_url,
      mimeType: att.content_type,
    })),
  });

  return (
    <DemoCard title={"FileInput (Dropzone)"} icon={UploadIcon}>
      <VStack w={"full"} align={"stretch"} gap={2}>
        <FileInput
          inputProps={register("file_dropzone")}
          accept={[".jpeg", ".jpg", ".png", ".pdf"]}
          maxFiles={2}
          variant={"dropzone"}
          existingFiles={existingFiles}
          onToggleDeleteExisting={toggleMarkedForDelete}
        />
      </VStack>
    </DemoCard>
  );
};

const FileInputButtonCard = () => {
  // Hooks
  const { register } = useForm();

  return (
    <DemoCard title={"FileInput (Button Trigger)"} icon={UploadIcon}>
      <VStack w={"full"} align={"stretch"} gap={2}>
        <FileInput
          inputProps={register("file_btn")}
          accept={[".jpeg", ".jpg", ".png"]}
          variant={"button"}
          label={"Unggah Berkas"}
        />
      </VStack>
    </DemoCard>
  );
};

const RichTextEditorCard = () => {
  return (
    <DemoCard title={"RichTextEditor"} icon={TextCursorInputIcon}>
      <RichTextEditorPresetEssential />
    </DemoCard>
  );
};

const ProgressCard = () => {
  return (
    <DemoCard title={"Progress"} icon={MessageSquareIcon}>
      <VStack align={"stretch"} gap={3}>
        <Progress.Root value={65}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>

        <Progress.Root striped={true} animated={true} value={80}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>

        <Progress.Root value={null}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      </VStack>
    </DemoCard>
  );
};

const ProgressCircleCard = () => {
  return (
    <DemoCard title={"ProgressCircle"} icon={MessageSquareIcon}>
      <HStack align={"center"} gap={4}>
        <ProgressCircle.Root value={68} size={"xl"}>
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
          <AbsoluteCenter>
            <ProgressCircle.ValueText />
          </AbsoluteCenter>
        </ProgressCircle.Root>

        <ProgressCircle.Root value={null} size={"lg"}>
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range strokeLinecap={"round"} />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      </HStack>
    </DemoCard>
  );
};

const SkeletonCard = () => {
  return (
    <DemoCard title={"Skeleton Loaders"} icon={MessageSquareIcon}>
      <VStack align={"stretch"} gap={3}>
        <HStack align={"center"} gap={3}>
          <SkeletonCircle boxSize={"36px"} />
          <VStack flex={1} align={"stretch"} gap={1}>
            <SkeletonText noOfLines={2} />
          </VStack>
        </HStack>
        <Skeleton w={"full"} h={"60px"} rounded={"md"} />
      </VStack>
    </DemoCard>
  );
};

const StateNoDataCard = () => {
  return (
    <DemoCard title={"State: No Data"} icon={MessageSquareIcon}>
      <StateNoData />
    </DemoCard>
  );
};

const StateAccessDeniedCard = () => {
  return (
    <DemoCard title={"State: Access Denied"} icon={MessageSquareIcon}>
      <StateAccessDenied />
    </DemoCard>
  );
};

const StateNoResultCard = () => {
  return (
    <DemoCard title={"State: No Result"} icon={MessageSquareIcon}>
      <StateNoResult />
    </DemoCard>
  );
};

const StateRetryCard = () => {
  return (
    <DemoCard title={"State: Retry"} icon={MessageSquareIcon}>
      <StateRetry />
    </DemoCard>
  );
};

const EmojiCard = () => {
  const EMOJI_KEYS: EmojiVariant[] = [
    "happy",
    "laugh",
    "funny",
    "cool",
    "love",
    "thumbUp",
    "thinking",
    "surprised",
    "sad",
    "cry",
  ];

  return (
    <DemoCard title={"Emoji"} icon={MessageSquareIcon}>
      <HStack wrap={"wrap"} align={"center"} justify={"start"} gap={3}>
        {EMOJI_KEYS.map((key) => (
          <Emoji key={key} variant={key} />
        ))}
      </HStack>
    </DemoCard>
  );
};

const ToastCard = () => {
  return (
    <DemoCard title={"Toast"} icon={BellIcon}>
      <HStack wrap={"wrap"} align={"center"} justify={"start"} gap={2}>
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => {
            toast.create({
              variant: "success",
              title: "Perubahan berhasil disimpan!",
            });
          }}
        >
          Success
        </Button>

        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => {
            toast.create({
              variant: "warning",
              title: "Peringatan: periksa format file",
            });
          }}
        >
          Warning
        </Button>

        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => {
            toast.create({
              variant: "error",
              title: "Gagal memproses data",
            });
          }}
        >
          Error
        </Button>
      </HStack>
    </DemoCard>
  );
};

const ModalCard = () => {
  return (
    <DemoCard title={"Modal"} icon={EyeIcon}>
      <OModal />
    </DemoCard>
  );
};

const DialogCard = () => {
  return (
    <DemoCard title={"Dialog"} icon={EyeIcon}>
      <ODialog />
    </DemoCard>
  );
};

const DrawerCard = () => {
  return (
    <DemoCard title={"Drawer"} icon={EyeIcon}>
      <ODrawer />
    </DemoCard>
  );
};

const AccordionCard = () => {
  const items = [
    { value: "a", title: "Item Pertama", text: "Konten penjelasan item pertama..." },
    { value: "b", title: "Item Kedua", text: "Konten penjelasan item kedua..." },
  ];

  return (
    <DemoCard title={"Accordion"} icon={LayersIcon}>
      <Accordion.Root collapsible={true} multiple={true} defaultValue={["a"]} w={"full"}>
        {items.map((item, index) => (
          <Accordion.Item key={index} value={item.value}>
            <Accordion.ItemTrigger>
              <Span flex={"1"}>{item.title}</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </DemoCard>
  );
};

const TabsCard = () => {
  const tabs = [
    { icon: UserIcon, triggerLabel: "Pengguna" },
    { icon: FolderIcon, triggerLabel: "Berkas" },
    { icon: CheckCircleIcon, triggerLabel: "Tugas" },
  ];

  return (
    <DemoCard title={"Tabs"} icon={LayersIcon}>
      <Tabs.Root defaultValue={"pengguna"} w={"full"}>
        <Tabs.List>
          {tabs.map((tab, index) => (
            <Tabs.Trigger
              key={index}
              value={tab.triggerLabel.toLowerCase()}
              gap={2}
            >
              <AppIcon icon={tab.icon} />
              {tab.triggerLabel}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value={"pengguna"} pt={2}>
          <P fontSize={"sm"} color={"fg.muted"}>
            Kelola daftar pengguna aplikasi.
          </P>
        </Tabs.Content>
      </Tabs.Root>
    </DemoCard>
  );
};

const StepsCard = () => {
  const steps = [
    { title: "Langkah 1", description: "Isi data pemohon" },
    { title: "Langkah 2", description: "Unggah dokumen pendukung" },
    { title: "Langkah 3", description: "Verifikasi & bayar" },
  ];

  return (
    <DemoCard title={"Steps"} icon={LayersIcon}>
      <Steps.Root count={steps.length} defaultStep={1} w={"full"}>
        <Steps.List>
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Trigger>
                <Steps.Indicator />
                <Steps.Title>{step.title}</Steps.Title>
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        {steps.map((step, index) => (
          <Steps.Content key={index} index={index}>
            <P fontSize={"sm"}>{step.description}</P>
          </Steps.Content>
        ))}

        <ButtonGroup size={"xs"} variant={"outline"} justify={"start"} mt={2}>
          <Steps.PrevTrigger asChild={true}>
            <Button>Prev</Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild={true}>
            <Button>Next</Button>
          </Steps.NextTrigger>
        </ButtonGroup>
      </Steps.Root>
    </DemoCard>
  );
};

const BreadcrumbCard = () => {
  return (
    <DemoCard title={"Breadcrumb"} icon={LayersIcon}>
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href={"#"}>Beranda</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href={"#"}>Pengaturan</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Profil</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </DemoCard>
  );
};

const CarouselCard = () => {
  const images = [
    "https://images.unsplash.com/photo-1656433031375-5042f5afe894?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1587466412525-87497b34fc88?auto=format&fit=crop&q=80&w=800",
  ];

  return (
    <DemoCard title={"Carousel"} icon={LayersIcon}>
      <Carousel.Root slideCount={images.length} w={"full"}>
        <Carousel.Control>
          <Carousel.PrevTrigger asChild={true}>
            <IconButton size={"xs"}>
              <LuArrowLeft />
            </IconButton>
          </Carousel.PrevTrigger>

          <Carousel.IndicatorGroup>
            {images.map((_, index) => (
              <Carousel.Indicator key={index} index={index} />
            ))}
          </Carousel.IndicatorGroup>

          <Carousel.NextTrigger asChild={true}>
            <IconButton size={"xs"}>
              <LuArrowRight />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>

        <Carousel.ItemGroup>
          {images.map((image, index) => (
            <Carousel.Item key={index} index={index}>
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                aspectRatio={16 / 9}
                rounded={"md"}
                objectFit={"cover"}
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
      </Carousel.Root>
    </DemoCard>
  );
};

const ExternalLinkCard = () => {
  return (
    <DemoCard title={"ExternalLink"} icon={CompassIcon}>
      <HStack align={"center"} gap={2}>
        <ExternalLink href={"https://atrbpn.go.id"}>atrbpn.go.id</ExternalLink>
      </HStack>
    </DemoCard>
  );
};

const UtilitiesCard = () => {
  const data = async () => {
    const res = await fetch(
      "https://fastly.picsum.photos/id/718/2880/1800.jpg?hmac=JZydaTGOvhjzXYg-o7Y5fytAXeTnAnCt_cadeQ3Mzjo",
    );
    return res.blob();
  };

  return (
    <DemoCard title={"DownloadTrigger"} icon={WrenchIcon}>
      <DownloadTrigger
        data={data}
        fileName={"contoh-unduhan.jpg"}
        mimeType={"image/jpeg"}
      >
        <Button variant={"outline"}>
          <AppIcon icon={IconDownload} />
          Unduh Berkas
        </Button>
      </DownloadTrigger>
    </DemoCard>
  );
};

// ---------------------------------------------------------------------------
// Overlay Trigger Subcomponents (OModal, ODialog, ODrawer)
// ---------------------------------------------------------------------------

const OModal = () => {
  // Hooks
  const { modalKey, isOpen, open, close } = usePopModal({
    modalKey: "exampleModal",
  });

  return (
    <Modal.Root modalKey={modalKey} opened={isOpen} open={open} close={close}>
      <Modal.Trigger>
        <Button variant={"outline"}>Open Modal</Button>
      </Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <Modal.Title w={"full"} fontSize={"xl"} fontWeight={"semibold"}>
            Modal Header
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <P>
            Modal adalah komponen dinamis yang merender dialog pada layar lebar
            dan drawer pada layar seluler secara otomatis.
          </P>
        </Modal.Body>
        <Modal.Footer>
          <Button flex={1} onClick={close}>
            Batal
          </Button>
          <Button flex={1} primary={true}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

const ODialog = () => {
  // Hooks
  const { modalKey, isOpen, open, close } = usePopModal({
    modalKey: "exampleDialog",
  });

  return (
    <Dialog.Root modalKey={modalKey} opened={isOpen} open={open} close={close}>
      <Dialog.Trigger>
        <Button variant={"outline"}>Open Dialog</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <P w={"full"} fontSize={"xl"} fontWeight={"semibold"}>
            Konfirmasi
          </P>
        </Dialog.Header>
        <Dialog.Body>
          <P>
            Apakah Anda yakin ingin memproses tindakan ini? Tindakan ini tidak dapat dibatalkan.
          </P>
        </Dialog.Body>
        <Dialog.Footer>
          <Button flex={1} onClick={close}>
            Batal
          </Button>
          <Button flex={1} primary={true}>
            Lanjutkan
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

const ODrawer = () => {
  // Hooks
  const { modalKey, isOpen, open, close } = usePopModal({
    modalKey: "exampleDrawer",
  });

  return (
    <Drawer.Root
      modalKey={modalKey}
      opened={isOpen}
      open={open}
      close={close}
      size={"xl"}
    >
      <Drawer.Trigger>
        <Button variant={"outline"}>Open Drawer</Button>
      </Drawer.Trigger>

      <Drawer.Content>
        <Drawer.Header>
          <P w={"full"} fontSize={"xl"} fontWeight={"semibold"}>
            Drawer Panel
          </P>
        </Drawer.Header>

        <Drawer.Body>
          <VStack align={"start"} gap={4}>
            <P>
              Drawer adalah panel samping untuk fokus pengguna pada konfigurasi atau form panjang.
            </P>
          </VStack>
        </Drawer.Body>

        <Drawer.Footer>
          <Button flex={1} onClick={close}>
            Tutup
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
};

// ---------------------------------------------------------------------------
// Full-width expansive sections
// ---------------------------------------------------------------------------

const DEFAULT_DEMO_SPLITTER_SIZE = [50, 50];

const Layout = () => {
  // Stores
  const splitterSize = useSplitterStore(
    (s) => s.sizesByKey["demo-layout"] ?? DEFAULT_DEMO_SPLITTER_SIZE,
  );
  const setSplitterSize = useSplitterStore((s) => s.setSize);

  const panelA = (
    <Splitter.Panel
      key={"a"}
      id={"a"}
      defaultSize={splitterSize[0]}
      minSize={20}
    >
      <Center boxSize={"full"} textStyle={"2xl"}>
        Panel A
      </Center>
    </Splitter.Panel>
  );

  const resizeTrigger = (
    <Splitter.ResizeTrigger
      key={"trigger"}
      id={"a:b"}
      onDoubleClick={() => {
        setSplitterSize("demo-layout", DEFAULT_DEMO_SPLITTER_SIZE);
      }}
    />
  );

  const panelB = (
    <Splitter.Panel
      key={"b"}
      id={"b"}
      defaultSize={splitterSize[1]}
      minSize={20}
    >
      <Center boxSize={"full"} textStyle={"2xl"}>
        Panel B
      </Center>
    </Splitter.Panel>
  );

  return (
    <Container.Root w={"full"}>
      <Container.Body gap={3} p={4}>
        <HStack align={"center"} gap={2} w={"full"} pb={1}>
          <AppIcon icon={LayoutGridIcon} size={"md"} color={"colorPalette.fg"} />
          <P fontSize={"md"} fontWeight={"semibold"}>
            Splitter (Layout)
          </P>
        </HStack>

        <HStack
          wrap={"wrap"}
          align={"center"}
          justify={"start"}
          gap={4}
          h={"240px"}
          w={"full"}
        >
          <Splitter.Root
            direction={"horizontal"}
            defaultLayout={DEFAULT_DEMO_SPLITTER_SIZE}
            onLayout={(layout: number[]) =>
              setSplitterSize("demo-layout", layout)
            }
            borderWidth={"1px"}
            h={"240px"}
            w={"full"}
          >
            {[panelA, resizeTrigger, panelB]}
          </Splitter.Root>
        </HStack>
      </Container.Body>
    </Container.Root>
  );
};

export const DataDisplay = () => {

  const dataList = {
    fields: [
      { th: "Name", sortable: true },
      { th: "Email", sortable: true },
      { th: "Account Status", sortable: true },
      { th: "Role", sortable: true },
      { th: "Department", sortable: true },
      { th: "Location", sortable: true },
      { th: "Plan", sortable: true },
    ],

    items: [
      {
        id: "1",
        data: {
          name: "Sulenq",
          email: "sulenq@email.com",
          accountStatus: "Active",
          role: "Developer",
          department: "Engineering",
          location: "Semarang",
          plan: "Pro",
        },
        columns: [
          { value: "Sulenq", td: "Sulenq" },
          { value: "sulenq@email.com", td: "sulenq@email.com" },
          { value: "Active", td: "Active" },
          { value: "Developer", td: "Developer" },
          { value: "Engineering", td: "Engineering" },
          { value: "Semarang", td: "Semarang" },
          { value: "Pro", td: "Pro" },
        ],
      },
      {
        id: "2",
        data: {
          name: "Budi Santoso",
          email: "budi@email.com",
          accountStatus: "Active",
          role: "Designer",
          department: "Design",
          location: "Jakarta",
          plan: "Enterprise",
        },
        columns: [
          { value: "Budi Santoso", td: "Budi Santoso" },
          { value: "budi@email.com", td: "budi@email.com" },
          { value: "Active", td: "Active" },
          { value: "Designer", td: "Designer" },
          { value: "Design", td: "Design" },
          { value: "Jakarta", td: "Jakarta" },
          { value: "Enterprise", td: "Enterprise" },
        ],
      },
    ],

    batchActions: [
      ({ selectedItemIds, clearSelectedItems }) => (
        <Button
          colorPalette={"red"}
          onClick={() => {
            clearSelectedItems();
          }}
        >
          <AppIcon icon={TrashIcon} />
          Hapus Terpilih ({selectedItemIds.length})
        </Button>
      ),
    ] as DataViewBatchActionsGenerator[],

    itemActions: [
      {
        key: "edit",
        label: "Edit",
        icon: EditIcon,
        onClick: (item) => {
          console.log("Edit item:", item);
        },
      },
      {
        key: "restore",
        label: "Restore",
        icon: Undo2Icon,
        onClick: (item) => {
          console.log("Restore item:", item);
        },
      },
      {
        key: "delete",
        label: "Delete",
        icon: TrashIcon,
        colorPalette: "red",
        modal: {
          triggerComponent: (item) => (
            <ConfirmationTrigger
              modalKey={`demo-delete-${(item as Record<string, unknown>).id || "item"}`}
              title={"Hapus Item"}
              description={`Data ${(item as Record<string, unknown>).name || item.id} akan dihapus secara permanen.`}
              confirmLabel={"Hapus"}
              colorPalette={"red"}
              onConfirm={() => {
                console.log("Delete confirmed:", item);
              }}
            />
          ),
        },
      },
    ] as DataViewItemActionsGenerator[],
  };

  // States
  const [pageSize, setPageSize] = useState<number>(20);
  const [page, setPage] = useState<number>(1);

  return (
    <Container.Root w={"full"}>
      <Container.Body gap={3} p={4}>
        <HStack align={"center"} gap={2} w={"full"} pb={1}>
          <AppIcon icon={TableIcon} size={"md"} color={"colorPalette.fg"} />
          <P fontSize={"md"} fontWeight={"semibold"}>
            DataViewTable
          </P>
        </HStack>

        <VStack align={"stretch"} gap={2} w={"full"}>
          <DataViewTable.Root
            headers={dataList.fields}
            items={dataList.items}
            batchActions={dataList.batchActions}
            itemActions={dataList.itemActions}
          >
            <DataViewTable.Header />
            <DataViewTable.Body />
          </DataViewTable.Root>

          <DataViewFooter
            pageSize={pageSize}
            setPageSize={setPageSize}
            page={page}
            setPage={setPage}
            currentDataLength={dataList.items.length}
            totalData={100}
          />
        </VStack>
      </Container.Body>
    </Container.Root>
  );
};

// ---------------------------------------------------------------------------
// Color Palettes
// ---------------------------------------------------------------------------


const COLOR_STEPS = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

const ColorPalettes = () => {
  // States
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Handlers
  const handleCopy = (token: string) => {
    void navigator.clipboard.writeText(token);
    setCopiedToken(token);
    toast.create({
      title: "Token disalin",
      description: token,
      variant: "info",
    });
    setTimeout(() => {
      setCopiedToken(null);
    }, 2000);
  };

  return (
    <Container.Root w={"full"}>
      <Container.Body gap={3} p={4} align={"stretch"}>
        <HStack align={"center"} gap={2} w={"full"} pb={1}>
          <AppIcon icon={PaletteIcon} size={"md"} color={"colorPalette.fg"} />
          <P fontSize={"md"} fontWeight={"semibold"}>
            Color Palettes
          </P>
        </HStack>

        <VStack align={"stretch"} gap={3} w={"full"}>
          {COLOR_PALETTES_LIST.map((item) => {
            return (
              <VStack
                key={item.palette}
                align={"stretch"}
                gap={2}
                p={3}
                rounded={"md"}
                border={"1px solid"}
                borderColor={"bg.canvas"}
                bg={"bg.subtle"}
              >
                <HStack
                  justify={"space-between"}
                  align={"center"}
                  w={"full"}
                  wrap={"wrap"}
                >
                  <HStack align={"center"} gap={2}>
                    <Box
                      boxSize={4}
                      rounded={"full"}
                      bg={`${item.palette}.500`}
                      border={"1px solid"}
                      borderColor={"border.subtle"}
                    />
                    <P fontWeight={"semibold"} fontSize={"sm"}>
                      {item.label}
                    </P>
                    <P fontSize={"xs"} color={"fg.muted"}>
                      ({item.palette})
                    </P>
                  </HStack>
                  <P fontSize={"xs"} color={"fg.muted"}>
                    {item.primaryHex}
                  </P>
                </HStack>

                <HStack
                  gap={1}
                  w={"full"}
                  h={10}
                  rounded={"sm"}
                  overflow={"hidden"}
                >
                  {COLOR_STEPS.map((step) => {
                    const token = `colors.${item.palette}.${step}`;
                    const isCopied = copiedToken === token;
                    return (
                      <Box
                        key={step}
                        flex={1}
                        h={"full"}
                        bg={`${item.palette}.${step}`}
                        position={"relative"}
                        cursor={"pointer"}
                        title={`${token} — Klik untuk salin`}
                        transition={"transform 0.15s ease"}
                        _hover={{
                          transform: "scaleY(1.15)",
                          zIndex: 1,
                        }}
                        onClick={() => handleCopy(token)}
                      >
                        <Center
                          position={"absolute"}
                          inset={0}
                          opacity={0}
                          _hover={{ opacity: 1 }}
                          bg={"blackAlpha.500"}
                          transition={"opacity 0.15s ease"}
                        >
                          <P
                            fontSize={"2xs"}
                            fontWeight={"bold"}
                            color={"white"}
                            userSelect={"none"}
                          >
                            {isCopied ? "✓" : step}
                          </P>
                        </Center>
                      </Box>
                    );
                  })}
                </HStack>
              </VStack>
            );
          })}
        </VStack>
      </Container.Body>
    </Container.Root>
  );
};
