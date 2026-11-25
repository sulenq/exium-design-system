// src/design-system/components/feedback/state-access-denied/state.access-denied.tsx

"use client";

import type { FeedbackStateProps } from "@/design-system/components/feedback/feedback-state/feedback-state.type";
import FeedbackState from "@/design-system/components/feedback/feedback-state/feedback-state";
import { t } from "@/shared/libs/i18n";
import { ProhibitIcon as BanIcon } from "@phosphor-icons/react";

export const StateAccessDenied = (props: FeedbackStateProps) => {
  // Props
  const {
    icon = BanIcon,
    title = t["common.forbidden"](),
    description = t["common.dont_have_access"](),
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
