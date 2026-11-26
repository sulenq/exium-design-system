// src/features/settings/constants/settings.navs.ts

import type { NavItem } from "@/shared/types/nav.type";
import { BellIcon, ClockIcon, QuestionIcon, InfoIcon, TranslateIcon, LockIcon, MonitorIcon, PlugIcon, SlidersHorizontalIcon, UserIcon, UserCircleIcon } from "@phosphor-icons/react";

export const SETTINGS_NAVS_MAP = {
  profile: {
    icon: UserIcon,
    titleKey: "settings.profile.title",
    descriptionKey: "settings.profile.description",
  },
  account: {
    icon: UserCircleIcon,
    titleKey: "settings.account.title",
    descriptionKey: "settings.account.description",
  },
  privacy: {
    icon: LockIcon,
    titleKey: "settings.privacy.title",
    descriptionKey: "settings.privacy.description",
  },
  notification: {
    icon: BellIcon,
    titleKey: "settings.notification.title",
    descriptionKey: "settings.notification.description",
  },
  appearance: {
    icon: MonitorIcon,
    titleKey: "settings.appearance.title",
    descriptionKey: "settings.appearance.description",
  },
  language: {
    icon: TranslateIcon,
    titleKey: "settings.language.title",
    descriptionKey: "settings.language.description",
  },
  datetime: {
    icon: ClockIcon,
    titleKey: "settings.datetime.title",
    descriptionKey: "settings.datetime.description",
  },
  integration: {
    icon: PlugIcon,
    titleKey: "settings.integration.title",
    descriptionKey: "settings.integration.description",
  },
  advanced: {
    icon: SlidersHorizontalIcon,
    titleKey: "settings.advanced.title",
    descriptionKey: "settings.advanced.description",
  },
  support: {
    icon: QuestionIcon,
    titleKey: "settings.support.title",
    descriptionKey: "settings.support.description",
  },
  about: {
    icon: InfoIcon,
    titleKey: "settings.about.title",
    descriptionKey: "settings.about.description",
  },
} as const satisfies Record<string, NavItem>;
