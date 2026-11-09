// src/design-system/components/emoji/ui/emoji.tsx

import type {
  EmojiProps,
  EmojiVariant,
} from "@/design-system/components/emoji/emoji/emoji.type";
import type { ComponentType } from "react";
import { EmojiAngry } from "@/design-system/components/emoji/emoji/emoji.angry";
import { EmojiCool } from "@/design-system/components/emoji/emoji/emoji.cool";
import { EmojiCry } from "@/design-system/components/emoji/emoji/emoji.cry";
import { EmojiEmbarassed } from "@/design-system/components/emoji/emoji/emoji.embarassed";
import { EmojiFunny } from "@/design-system/components/emoji/emoji/emoji.funny";
import { EmojiHappy } from "@/design-system/components/emoji/emoji/emoji.happy";
import { EmojiLaugh } from "@/design-system/components/emoji/emoji/emoji.laugh";
import { EmojiLove } from "@/design-system/components/emoji/emoji/emoji.love";
import { EmojiPoker } from "@/design-system/components/emoji/emoji/emoji.poker";
import { EmojiRollingEyes } from "@/design-system/components/emoji/emoji/emoji.rolling-eyes";
import { EmojiSad } from "@/design-system/components/emoji/emoji/emoji.sad";
import { EmojiScream } from "@/design-system/components/emoji/emoji/emoji.scream";
import { EmojiShout } from "@/design-system/components/emoji/emoji/emoji.shout";
import { EmojiSpeechless } from "@/design-system/components/emoji/emoji/emoji.speechless";
import { EmojiSulk } from "@/design-system/components/emoji/emoji/emoji.sulk";
import { EmojiSurprised } from "@/design-system/components/emoji/emoji/emoji.surprised";
import { EmojiThinking } from "@/design-system/components/emoji/emoji/emoji.thinking";
import { EmojiThumbUp } from "@/design-system/components/emoji/emoji/emoji.thumb-up";
import { EmojiWicked } from "@/design-system/components/emoji/emoji/emoji.wicked";

// Constants
const EMOJI_COMPONENTS: Record<EmojiVariant, ComponentType<EmojiProps>> = {
  poker: EmojiPoker,
  angry: EmojiAngry,
  cool: EmojiCool,
  cry: EmojiCry,
  embarassed: EmojiEmbarassed,
  funny: EmojiFunny,
  happy: EmojiHappy,
  laugh: EmojiLaugh,
  love: EmojiLove,
  rollingEyes: EmojiRollingEyes,
  sad: EmojiSad,
  scream: EmojiScream,
  shout: EmojiShout,
  speechless: EmojiSpeechless,
  sulk: EmojiSulk,
  surprised: EmojiSurprised,
  thinking: EmojiThinking,
  wicked: EmojiWicked,
  thumbUp: EmojiThumbUp,
};

export const Emoji = (props: EmojiProps) => {
  // Props
  const { variant = "poker", ...restProps } = props;

  // Derived Values
  const SelectedEmoji = EMOJI_COMPONENTS[variant] ?? EmojiPoker;

  return <SelectedEmoji {...restProps} />;
};

