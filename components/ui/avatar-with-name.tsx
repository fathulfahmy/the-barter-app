import React from "react";
import { View, ViewProps } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

import { useAppTheme } from "@/lib/react-native-paper";
import { User } from "@/types/api";
import { formatAvatarName } from "@/utils/format";

type AvatarWithNameProps = ViewProps & {
  user: User | null | undefined;
  size?: number;
  variant?: VariantProp<never> | undefined;
};

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({ user, size, variant, ...props }) => {
  const { fonts } = useAppTheme();

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }} {...props}>
      {user?.avatar ? (
        <Avatar.Image source={{ uri: user.avatar.uri }} size={size ?? fonts.bodyMedium.fontSize} />
      ) : (
        <Avatar.Text label={formatAvatarName(user?.name)} size={(size ?? fonts.bodyMedium.fontSize) * 2} />
      )}
      <Text variant={variant ?? "bodyMedium"}>{user?.name}</Text>
    </View>
  );
};
