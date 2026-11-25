// src/design-system/components/typography/rich-text-editor/rich-text-editor.control.tsx

"use client";

import { IconButton } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import type { SelectProps } from "@/design-system/components/input/select/select.type";
import SelectInput from "@/design-system/components/input/select/select";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Popover } from "@/design-system/components/overlay/popover/popover";
import { Tooltip } from "@/design-system/components/overlay/tooltip/tooltip";
import type { IconButtonProps } from "@chakra-ui/react";
import { ColorSwatch } from "@chakra-ui/react";
import "@tiptap/extension-font-family";
import "@tiptap/extension-highlight";
import "@tiptap/extension-link";
import "@tiptap/extension-subscript";
import "@tiptap/extension-superscript";
import "@tiptap/extension-text-align";
import "@tiptap/extension-text-style";
import "@tiptap/extension-underline";
import "@tiptap/starter-kit";
import { TextBIcon as BoldIcon, CodeIcon, EraserIcon, TextHOneIcon as Heading1Icon, TextHTwoIcon as Heading2Icon, TextHThreeIcon as Heading3Icon, TextHFourIcon as Heading4Icon, HighlighterIcon, TextItalicIcon as ItalicIcon, LinkIcon as Link2Icon, LinkBreakIcon as Link2OffIcon, ListIcon, ListNumbersIcon as ListOrderedIcon, MinusIcon, QuotesIcon as QuoteIcon, ArrowUUpRightIcon as RedoIcon, TextStrikethroughIcon as StrikethroughIcon, TextSubscriptIcon as SubscriptIcon, TextSuperscriptIcon as SuperscriptIcon, TextAlignCenterIcon, TextAlignRightIcon as TextAlignEndIcon, TextAlignJustifyIcon, TextAlignLeftIcon as TextAlignStartIcon, TextTIcon as TypeIcon, TextUnderlineIcon as UnderlineIcon, ArrowUUpLeftIcon as UndoIcon } from "@phosphor-icons/react";
import { forwardRef, useId, useState } from "react";
import type {
  BooleanControlConfig,
  ButtonControlProps,
  SelectControlConfig,
  SwatchControlConfig,
} from "./rich-text-editor.type";
import { useRichTextEditorContext } from "./rich-text-editor.context";
import type { LocalizedLabel } from "./rich-text-editor.type";
import { t } from "@/shared/libs/i18n";

const resolveLabel = (label?: LocalizedLabel) =>
  typeof label === "function" ? label() : label;

export const ButtonControl = forwardRef<HTMLButtonElement, ButtonControlProps>(
  function ButtonControl(props, ref) {
    // Props
    const { icon, label, ...rest } = props;

    return (
      <Tooltip content={label}>
        <IconButton ref={ref} aria-label={label} {...rest}>
          {icon && <AppIcon icon={icon} />}
        </IconButton>
      </Tooltip>
    );
  },
);

///////////////////// Boolean Control /////////////////////

export function createBooleanControl(config: BooleanControlConfig) {
  const { label, icon, isDisabled, command, getVariant, getProps } = config;

  const BooleanControl = forwardRef<HTMLButtonElement, IconButtonProps>(
    function BooleanControl(props, ref) {
      const { editor } = useRichTextEditorContext();
      if (!editor) return null;
      const disabled = isDisabled ? isDisabled(editor) : false;
      const dynamicProps = getProps ? getProps(editor) : {};
      const variant =
        getVariant && !getProps ? getVariant(editor) : dynamicProps.variant;

      return (
        <ButtonControl
          ref={ref}
          label={resolveLabel(label) ?? ""}
          icon={icon}
          variant={variant}
          onClick={() => command(editor)}
          disabled={disabled}
          {...props}
        />
      );
    },
  );

  BooleanControl.displayName = `BooleanControl(${resolveLabel(label)})`;
  return BooleanControl;
}

///////////////////// Select Control (with options) /////////////////////

export function createSelectControl(config: SelectControlConfig) {
  const {
    label,
    options,
    w = "80px",
    getValue,
    command,
    isDisabled,
    getProps,
  } = config;

  function SelectControl(props: SelectProps) {
    const { editor } = useRichTextEditorContext();
    const controlId = useId();

    if (!editor) return null;

    const currentValue = getValue(editor);
    const disabled = isDisabled ? isDisabled(editor) : false;

    const dynamicProps = getProps ? getProps(editor) : {};

    return (
      <SelectInput
        options={options.map((option) => ({
          ...option,
          label: resolveLabel(option.label) ?? option.value,
        }))}
        variant={"ghost"}
        positioning={{ sameWidth: false }}
        placeholder={resolveLabel(label)}
        flexShrink={0}
        w={w}
        _hover={{
          bg: "bg.subtle",
        }}
        {...props}
        value={currentValue}
        onValueChange={(value) => command(editor, value)}
        disabled={disabled}
        ids={{ trigger: controlId }}
        {...dynamicProps}
      />
    );
  }

  return SelectControl;
}

///////////////////// Swatch Control (with color swatches) /////////////////////

export function createSwatchControl(config: SwatchControlConfig) {
  const {
    label,
    swatches,
    getValue,
    command,
    showRemove = false,
    onRemove,
    isDisabled,
    icon,
    getProps,
  } = config;

  const SwatchControl = forwardRef<HTMLButtonElement, IconButtonProps>(
    function SwatchControl(props, ref) {
      const { editor } = useRichTextEditorContext();
      const [open, setOpen] = useState(false);
      const triggerId = useId();

      if (!editor) return null;
      const currentValue = getValue(editor);
      const disabled = isDisabled ? isDisabled(editor) : false;
      const dynamicProps = getProps ? getProps(editor) : {};
      const resolvedLabel = resolveLabel(label);

      return (
        <Popover.Root
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          ids={{ trigger: triggerId }}
          size={"sm"}
        >
          <Tooltip content={resolvedLabel} ids={{ trigger: triggerId }}>
            <Popover.Trigger>
              <IconButton
                ref={ref}
                aria-label={resolvedLabel}
                disabled={disabled}
                {...dynamicProps}
                {...props}
              >
                <VStack align={"center"} gap={"1px"}>
                  {icon && <AppIcon icon={icon} size={"sm"} />}

                  <ColorSwatch value={currentValue} h={"4px"} w={"100%"} />
                </VStack>
              </IconButton>
            </Popover.Trigger>
          </Tooltip>

          <Popover.Content width={"auto"}>
            <Popover.Body p={2}>
              <HStack align={"center"} wrap={"wrap"} gap={1}>
                {swatches.map((swatch) => (
                  <ColorSwatch
                    key={swatch.value}
                    role={"button"}
                    tabIndex={0}
                    aria-label={resolveLabel(swatch.label) ?? swatch.value}
                    cursor={"pointer"}
                    value={swatch.color}
                    onClick={() => {
                      command(editor, swatch.value);
                      setOpen(false);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        command(editor, swatch.value);
                        setOpen(false);
                      }
                    }}
                  />
                ))}

                {showRemove && onRemove && (
                  <Popover.CloseTrigger asChild pos={"static"}>
                    <IconButton
                      size={"2xs"}
                      aria-label={t["rich_text_editor.remove_color"]()}
                      onClick={() => {
                        onRemove(editor);
                        setOpen(false);
                      }}
                    >
                      <AppIcon icon={EraserIcon} />
                    </IconButton>
                  </Popover.CloseTrigger>
                )}
              </HStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Root>
      );
    },
  );

  SwatchControl.displayName = `SwatchControl(${resolveLabel(label) || "Unnamed"})`;
  return SwatchControl;
}

// -------------------------------------------------------------------------------------

export const FontFamily = createSelectControl({
  label: t["rich_text_editor.font_family"],
  w: "80px",
  options: [
    { value: "default", label: t["rich_text_editor.font_default"] },
    { value: "serif", label: t["rich_text_editor.font_serif"] },
    { value: "mono", label: t["rich_text_editor.font_mono"] },
    { value: "cursive", label: t["rich_text_editor.font_cursive"] },
  ],
  getValue: (editor) =>
    editor.getAttributes("textStyle")?.fontFamily || "default",
  command: (editor, value) =>
    value === "default"
      ? editor.chain().focus().unsetFontFamily().run()
      : editor.chain().focus().setFontFamily(value).run(),
});

export const FontSize = createSelectControl({
  label: t["rich_text_editor.font_size"],
  w: "80px",
  options: [
    { value: "12px", label: "12px" },
    { value: "14px", label: "14px" },
    { value: "16px", label: "16px" },
    { value: "18px", label: "18px" },
  ],
  getValue: (editor) => editor.getAttributes("textStyle")?.fontSize || "14px",
  command: (editor, value) =>
    editor.chain().focus().setMark("textStyle", { fontSize: value }).run(),
});

export const Bold = createBooleanControl({
  label: t["rich_text_editor.bold"],
  icon: BoldIcon,
  command: (editor) => editor.chain().focus().toggleBold().run(),
  getVariant: (editor) => (editor.isActive("semibold") ? "subtle" : "ghost"),
});

export const Italic = createBooleanControl({
  label: t["rich_text_editor.italic"],
  icon: ItalicIcon,
  command: (editor) => editor.chain().focus().toggleItalic().run(),
  getVariant: (editor) => (editor.isActive("italic") ? "subtle" : "ghost"),
});

export const Underline = createBooleanControl({
  label: t["rich_text_editor.underline"],
  icon: UnderlineIcon,
  command: (editor) => editor.chain().focus().toggleUnderline().run(),
  getVariant: (editor) => (editor.isActive("underline") ? "subtle" : "ghost"),
});

export const Strikethrough = createBooleanControl({
  label: t["rich_text_editor.strikethrough"],
  icon: StrikethroughIcon,
  command: (editor) => editor.chain().focus().toggleStrike().run(),
  getVariant: (editor) => (editor.isActive("strike") ? "subtle" : "ghost"),
});

export const Code = createBooleanControl({
  label: t["rich_text_editor.code"],
  icon: CodeIcon,
  command: (editor) => editor.chain().focus().toggleCode().run(),
  getVariant: (editor) => (editor.isActive("code") ? "subtle" : "ghost"),
});

export const Subscript = createBooleanControl({
  label: t["rich_text_editor.subscript"],
  icon: SubscriptIcon,
  command: (editor) => editor.chain().focus().toggleSubscript().run(),
  getVariant: (editor) => (editor.isActive("subscript") ? "subtle" : "ghost"),
});

export const Superscript = createBooleanControl({
  label: t["rich_text_editor.superscript"],
  icon: SuperscriptIcon,
  command: (editor) => editor.chain().focus().toggleSuperscript().run(),
  getVariant: (editor) => (editor.isActive("superscript") ? "subtle" : "ghost"),
});

export const H1 = createBooleanControl({
  label: t["rich_text_editor.heading_1"],
  icon: Heading1Icon,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 1 }) ? "subtle" : "ghost",
});

export const H2 = createBooleanControl({
  label: t["rich_text_editor.heading_2"],
  icon: Heading2Icon,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 2 }) ? "subtle" : "ghost",
});

export const H3 = createBooleanControl({
  label: t["rich_text_editor.heading_3"],
  icon: Heading3Icon,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 3 }) ? "subtle" : "ghost",
});

export const H4 = createBooleanControl({
  label: t["rich_text_editor.heading_4"],
  icon: Heading4Icon,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 4 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 4 }) ? "subtle" : "ghost",
});

export const BulletList = createBooleanControl({
  label: t["rich_text_editor.bullet_list"],
  icon: ListIcon,
  command: (editor) => editor.chain().focus().toggleBulletList().run(),
  getVariant: (editor) => (editor.isActive("bulletList") ? "subtle" : "ghost"),
});

export const OrderedList = createBooleanControl({
  label: t["rich_text_editor.ordered_list"],
  icon: ListOrderedIcon,
  command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  getVariant: (editor) => (editor.isActive("orderedList") ? "subtle" : "ghost"),
});

export const Blockquote = createBooleanControl({
  label: t["rich_text_editor.blockquote"],
  icon: QuoteIcon,
  command: (editor) => editor.chain().focus().toggleBlockquote().run(),
  getVariant: (editor) => (editor.isActive("blockquote") ? "subtle" : "ghost"),
});

export const Hr = createBooleanControl({
  label: t["rich_text_editor.horizontal_rule"],
  icon: MinusIcon,
  command: (editor) => editor.chain().focus().setHorizontalRule().run(),
  getVariant: (editor) => (editor.isActive("blockquote") ? "subtle" : "ghost"),
});

export const Link = createBooleanControl({
  label: t["rich_text_editor.link"],
  icon: Link2Icon,
  command: (editor) => {
    const url = window.prompt("Enter URL");
    if (url)
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
  },
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
});

export const Unlink = createBooleanControl({
  label: t["rich_text_editor.unlink"],
  icon: Link2OffIcon,
  command: (editor) => editor.chain().focus().unsetLink().run(),
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
});

export const AlignLeft = createBooleanControl({
  label: t["rich_text_editor.align_left"],
  icon: TextAlignStartIcon,
  command: (editor) => editor.chain().focus().setTextAlign("left").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "left" }) ? "subtle" : "ghost",
});

export const AlignCenter = createBooleanControl({
  label: t["rich_text_editor.align_center"],
  icon: TextAlignCenterIcon,
  command: (editor) => editor.chain().focus().setTextAlign("center").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "center" }) ? "subtle" : "ghost",
});

export const AlignJustify = createBooleanControl({
  label: t["rich_text_editor.align_justify"],
  icon: TextAlignJustifyIcon,
  command: (editor) => editor.chain().focus().setTextAlign("justify").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "justify" }) ? "subtle" : "ghost",
});

export const AlignRight = createBooleanControl({
  label: t["rich_text_editor.align_right"],
  icon: TextAlignEndIcon,
  command: (editor) => editor.chain().focus().setTextAlign("right").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "right" }) ? "subtle" : "ghost",
});

export const Undo = createBooleanControl({
  label: t["rich_text_editor.undo"],
  icon: UndoIcon,
  command: (editor) => editor.chain().focus().undo().run(),
  isDisabled: (editor) => !editor.can().undo(),
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
});

export const Redo = createBooleanControl({
  label: t["rich_text_editor.redo"],
  icon: RedoIcon,
  command: (editor) => editor.chain().focus().redo().run(),
  isDisabled: (editor) => !editor.can().redo(),
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
});

export const TextColor = createSwatchControl({
  label: t["rich_text_editor.text_color"],
  icon: TypeIcon,
  swatches: [
    { label: t["rich_text_editor.color_red"], value: "#FF0000", color: "#FF0000" },
    { label: t["rich_text_editor.color_green"], value: "#00FF00", color: "#00FF00" },
    { label: t["rich_text_editor.color_blue"], value: "#0000FF", color: "#0000FF" },
    { label: t["rich_text_editor.color_yellow"], value: "#FFFF00", color: "#FFFF00" },
    { label: t["rich_text_editor.color_purple"], value: "#800080", color: "#800080" },
    { label: t["rich_text_editor.color_orange"], value: "#FFA500", color: "#FFA500" },
  ],
  getValue: (editor) => {
    const color = editor.getAttributes("textStyle")?.color;
    return color || "";
  },
  getProps: (editor) => ({
    variant: editor.getAttributes("textStyle")?.color ? "subtle" : "ghost",
  }),
  command: (editor, color) =>
    editor.chain().focus().setMark("textStyle", { color }).run(),
  showRemove: true,
  onRemove: (editor) => editor.chain().focus().unsetMark("textStyle").run(),
});

export const Highlight = createSwatchControl({
  label: t["rich_text_editor.highlight"],
  icon: HighlighterIcon,
  swatches: [
    { label: t["rich_text_editor.color_yellow"], value: "#FFFF00", color: "#FFFF00" },
    { label: t["rich_text_editor.color_green"], value: "#00FF00", color: "#00FF00" },
    { label: t["rich_text_editor.color_cyan"], value: "#00FFFF", color: "#00FFFF" },
    { label: t["rich_text_editor.color_pink"], value: "#FF69B4", color: "#FF69B4" },
    { label: t["rich_text_editor.color_orange"], value: "#FFA500", color: "#FFA500" },
    { label: t["rich_text_editor.color_purple"], value: "#DDA0DD", color: "#DDA0DD" },
  ],
  getValue: (editor) => {
    const color = editor.getAttributes("highlight")?.color;
    return color || "";
  },
  getProps: (editor) => ({
    variant: editor.getAttributes("highlight")?.color ? "subtle" : "ghost",
  }),
  command: (editor, color) =>
    editor.chain().focus().toggleHighlight({ color }).run(),
  showRemove: true,
  onRemove: (editor) => editor.chain().focus().unsetHighlight().run(),
});

// export const TextStyle = createSelectControl({
//   label: "Text Style",
//   width: "120px",
//   placeholder: "Paragraph",
//   options: [
//     { value: "paragraph", label: "Paragraph" },
//     { value: "heading1", label: "Heading 1" },
//     { value: "heading2", label: "Heading 2" },
//     { value: "heading3", label: "Heading 3" },
//     { value: "blockquote", label: "Quote" },
//     { value: "horizontalRule", label: "Divider", icon: <LuMinus /> },
//   ],
//   getValue: (editor) => {
//     if (editor.isActive("heading", { level: 1 })) return "heading1";
//     if (editor.isActive("heading", { level: 2 })) return "heading2";
//     if (editor.isActive("heading", { level: 3 })) return "heading3";
//     if (editor.isActive("blockquote")) return "blockquote";
//     return "paragraph";
//   },
//   command: (editor, value) => {
//     if (value === "paragraph") {
//       editor.chain().focus().setParagraph().run();
//     } else if (value === "heading1") {
//       editor.chain().focus().toggleHeading({ level: 1 }).run();
//     } else if (value === "heading2") {
//       editor.chain().focus().toggleHeading({ level: 2 }).run();
//     } else if (value === "heading3") {
//       editor.chain().focus().toggleHeading({ level: 3 }).run();
//     } else if (value === "blockquote") {
//       editor.chain().focus().toggleBlockquote().run();
//     } else if (value === "horizontalRule") {
//       editor.chain().focus().setHorizontalRule().run();
//     }
//   },
//   renderValue: (value, option) => {
//     const textStyle: Record<string, BoxProps> = {
//       paragraph: { fontWeight: "normal", fontSize: "sm" },
//       heading1: { fontWeight: "semibold", fontSize: "lg" },
//       heading2: { fontWeight: "semibold", fontSize: "md" },
//       heading3: { fontWeight: "medium", fontSize: "sm" },
//       blockquote: { fontStyle: "italic", fontSize: "sm" },
//       horizontalRule: { fontWeight: "medium", fontSize: "sm" },
//     };
//     return <Box {...textStyle[value]}>{option?.label || "Paragraph"}</Box>;
//   },
// });
