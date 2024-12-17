import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { AppAvatar } from "@/components/ui/avatar";
import { User } from "@/types/api";

export const AuthProfile = ({ user }: { user: User | null | undefined }) => {
  return (
    <View style={styles.container}>
      <AppAvatar user={user} size={96} />
      <Text variant="titleMedium">{user?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 8,
    padding: 16,
  },
});
