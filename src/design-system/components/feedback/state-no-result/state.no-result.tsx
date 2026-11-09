// src/design-system/components/feedback/ui/state.no-result.tsx

"use client";

import type { StateNoResultProps } from "@/design-system/components/feedback/feedback-state/feedback-state.type";
import FeedbackState from "@/design-system/components/feedback/feedback-state/feedback-state";
import { P } from "@/design-system/components/typography/p/p";
import { t } from "@/shared/libs/i18n";
import { IconMoodPuzzled } from "@tabler/icons-react";

export const StateNoResult = (props: StateNoResultProps) => {
  // Props
  const {
    icon = IconMoodPuzzled,
    title = t["common.no_results_found_for"](),
    query = "...",
    children,
    ...restProps
  } = props;

  return (
    <FeedbackState icon={icon} title={title} {...restProps}>
      <P
        textAlign={"center"}
        fontWeight={"semibold"}
        color={"fg.muted"}
        mt={-2}
      >
        {`"${query}"`}
      </P>

      {children}
    </FeedbackState>
  );
};
