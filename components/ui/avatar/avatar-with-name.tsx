import React from "react";
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

import { User } from "@/types/api";

import { AppAvatar, AppAvatarProps } from "./app-avatar";

type AvatarWithNameProps = {
  user: User | undefined | null;
  textVariant?: VariantProp<never>;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
} & Omit<AppAvatarProps, "uri" | "name">;

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({
  user,
  textVariant,
  textStyle,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <AppAvatar {...props} uri={user?.avatar?.uri} name={user?.name} />
      <Text variant={textVariant ?? "bodyMedium"} style={textStyle}>
        {user?.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
