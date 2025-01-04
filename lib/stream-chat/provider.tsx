import { PropsWithChildren } from "react";

import { Chat, DeepPartial, OverlayProvider, Theme } from "stream-chat-expo";

import { parseRgbToRgba } from "@/utils/format";

import { useAppTheme } from "../react-native-paper";
import { client } from "./client";

export const StreamChatProvider = ({ children }: PropsWithChildren) => {
  /* ======================================== HOOKS */
  const { colors, fonts } = useAppTheme();

  /* ======================================== THEME */
  const StreamChatTheme: DeepPartial<Theme> = {
    colors: {
      white: colors.background,
      white_smoke: colors.background,
      white_snow: colors.background,
      static_white: colors.background,

      black: colors.onBackground,
      static_black: colors.onBackground,
      text_high_emphasis: colors.onBackground,
      text_low_emphasis: colors.onSurfaceVariant,

      accent_blue: colors.primary,
      accent_error: colors.error,
      accent_green: colors.green,
      accent_info: colors.success,
      accent_red: colors.red,

      grey: colors.outline,
      grey_dark: colors.outline,
      grey_gainsboro: colors.surfaceVariant,
      grey_whisper: colors.surfaceVariant,
      border: colors.surfaceVariant,

      bg_user: colors.background,
      bg_gradient_start: colors.background,
      bg_gradient_end: colors.background,
      icon_background: colors.background,
      targetedMessageBackground: parseRgbToRgba(colors.primaryContainer, 0.25),

      label_bg_transparent: parseRgbToRgba(colors.onBackground, 0.2),
      modal_shadow: parseRgbToRgba(colors.shadow, 0.6),
      overlay: parseRgbToRgba(colors.onBackground, 0.8),
      shadow_icon: parseRgbToRgba(colors.shadow, 0.25),
      transparent: "transparent",
    },
    messageSimple: {
      content: {
        receiverMessageBackgroundColor: colors.surfaceVariant,
        senderMessageBackgroundColor: colors.primaryContainer,
        markdown: {
          text: {
            fontFamily: fonts.bodyLarge.fontFamily,
            color: colors.onBackground,
          },
        },
      },
    },
  };

  const style = { style: StreamChatTheme };

  /* ======================================== PROVIDER */
  return (
    <OverlayProvider value={style}>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};
