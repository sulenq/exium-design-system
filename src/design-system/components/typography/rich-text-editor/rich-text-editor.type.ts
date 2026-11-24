// src/design-system/components/typography/rich-text-editor/rich-text-editor.type.ts

import type { SelectProps } from "@/design-system/components/input/select/select.type";
import type { BoxProps, IconButtonProps, StackProps } from "@chakra-ui/react";
import type { Editor, EditorContent, EditorOptions } from "@tiptap/react";
import type { ComponentProps, ComponentType } from "react";

export type RichEditorPresetProps = RichTextEditorRootProps & {
  editorOptions?: Partial<EditorOptions>;
};

export type RichTextEditorRootProps = {};

export type RichTextEditorProps = BoxProps & {
  editor: Editor | null;
  disabled?: boolean;
};

export type RichTextEditorContextValue = {
  editor: Editor | null;
};

export type RichTextEditorToolbarVariant = "sticky" | "floating" | "fixed";

export type RichTextEditorToolbarProps = StackProps & {
  variant?: RichTextEditorToolbarVariant;
  stickyOffset?: string;
};

export type RichTextEditorContentProps = Omit<
  ComponentProps<typeof EditorContent>,
  "editor"
>;

export type RichTextEditorControlGroupProps = StackProps;

/** Plain text, or a Paraglide message function resolved at render time. */
export type LocalizedLabel = string | (() => string);

export type BaseControlConfig = {
  label: LocalizedLabel;
  icon?: ComponentType;
  isDisabled?: (editor: Editor) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProps?: (editor: Editor) => Record<string, any>;
};

export type ButtonControlProps = Omit<IconButtonProps, "aria-label"> & {
  icon?: ComponentType;
  label: string;
};

export type BooleanControlConfig = BaseControlConfig & {
  icon?: ComponentType;
  command: (editor: Editor) => void;
  getVariant?: (editor: Editor) => IconButtonProps["variant"];
};

export type SelectOption = {
  icon?: ComponentType;
  value: string;
  label: LocalizedLabel;
};

export type SelectControlConfig = BaseControlConfig &
  Omit<SelectProps, "options" | "placeholder"> & {
    options: SelectOption[];
    getValue: (editor: Editor) => string;
    command: (editor: Editor, value: string) => void;
    placeholder?: string;
    // renderValue?: (value: string, option?: SelectOption) => ReactNode;
  };

export type SwatchOption = {
  value: string;
  color: string;
  label?: LocalizedLabel;
};

export type SwatchControlConfig = BaseControlConfig & {
  swatches: SwatchOption[];
  getValue: (editor: Editor) => string;
  command: (editor: Editor, value: string) => void;
  showRemove?: boolean;
  onRemove?: (editor: Editor) => void;
};
