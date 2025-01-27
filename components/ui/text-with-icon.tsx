import React from "react";
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { Icon, Text } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

import { useAppTheme } from "@/lib/react-native-paper";

type AvatarWithNameProps = ViewProps & {
  icon: IconSource;
  label: string | null | undefined;
  size?: number;
  variant?: VariantProp<never>;
  style?: StyleProp<ViewStyle>;
};

export const TextWithIcon: React.FC<AvatarWithNameProps> = ({ icon, label, size, variant, style, ...props }) => {
  const { fonts } = useAppTheme();

  if (!label) {
    return null;
  }

  const containerStyle = [styles.container, style];

  return (
    <View style={containerStyle} {...props}>
      <Icon source={icon} size={size ?? fonts.bodyMedium.fontSize} />
      <Text variant={variant ?? "bodyMedium"}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
});
