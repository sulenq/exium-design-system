// src/design-system/components/input/floating-label/floating-label.css.ts

/**
 * Returns a space fallback for placeholder in floating variant if not provided.
 * Native `:placeholder-shown` requires a non-empty placeholder string to work.
 */
export function getFloatingPlaceholder(placeholder?: string): string {
  return placeholder ?? " ";
}

const FLOATED =
  "&:has(:is(input, textarea):focus), " +
  "&:has(:is(input, textarea):not(:placeholder-shown)), " +
  "&:has(:is(input, textarea):-webkit-autofill)";

export const floatingLabelWrapperCss = {
  // Ensure relative positioning
  position: "relative" as const,

  // Textarea top gradient overlay fade-in when floated
  "& > [data-part='floating-textarea-gradient']": {
    opacity: 0,
    transition: "opacity 0.18s ease",
  },
  [`${FLOATED} > [data-part='floating-textarea-gradient']`]: {
    opacity: 1,
  },

  // Resting state
  "& [data-part='floating-label']": {
    transform: "translateY(12px)",
    transition:
      "transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), font-size 0.18s cubic-bezier(0.4, 0, 0.2, 1), color 0.18s ease",
  },
  "& [data-part='floating-label-text']": {
    fontSize: "md",
    transition: "font-size 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Floated state
  [`${FLOATED} [data-part='floating-label']`]: {
    transform: "translateY(0)",
  },
  [`${FLOATED} [data-part='floating-label-text']`]: {
    fontSize: "xs",
  },

  // Placeholder visibility: hide placeholder when resting, show when focused or floated
  "& :is(input, textarea)::placeholder": {
    color: "transparent !important",
  },
  "& :is(input, textarea):focus::placeholder": {
    color: "var(--chakra-colors-fg-subtle, inherit) !important",
  },
};

