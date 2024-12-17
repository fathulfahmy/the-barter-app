import React from "react";
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

import { AppAvatar, AppAvatarProps } from "./app-avatar";

type AvatarWithNameProps = Omit<AppAvatarProps, "size"> & {
  textVariant?: VariantProp<never>;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({
  user,
  textVariant,
  textStyle,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <AppAvatar user={user} {...props} />
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
