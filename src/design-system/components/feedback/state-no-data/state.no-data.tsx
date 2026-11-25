// src/design-system/components/feedback/state-no-data/state.no-data.tsx

"use client";

import type { FeedbackStateProps } from "@/design-system/components/feedback/feedback-state/feedback-state.type";
import FeedbackState from "@/design-system/components/feedback/feedback-state/feedback-state";
import { t } from "@/shared/libs/i18n";
import { TrayIcon } from "@phosphor-icons/react";

export const StateNoData = (props: FeedbackStateProps) => {
  // Props
  const {
    icon = TrayIcon,
    title = t["common.no_data"](),
    description,
    children,
    ...restProps
  } = props;

  return (
    <FeedbackState
      icon={icon}
      title={title}
      description={description}
      {...restProps}
    >
      {children}
    </FeedbackState>
  );
};
