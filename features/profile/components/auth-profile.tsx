import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";

import { User } from "@/types/api";
import { formatAvatarName } from "@/utils/format";

export const AuthProfile = ({ user }: { user: User | null | undefined }) => {
  return (
    <View style={{ alignItems: "center", gap: 8, padding: 16 }}>
      <Avatar.Text label={formatAvatarName(user?.name)} size={96} />
      <Text variant="titleMedium">{user?.name}</Text>
    </View>
  );
};
