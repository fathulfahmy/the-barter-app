import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { AppAvatar } from "@/components/ui/avatar";
import { useUser } from "@/lib/auth/auth";

export const AuthProfile = () => {
  /* ======================================== QUERIES */
  const userQuery = useUser();
  const user = userQuery.data;

  /* ======================================== RETURNS */
  if (userQuery.isLoading) return null;

  return (
    <View style={styles.container}>
      <AppAvatar uri={user?.avatar?.uri} name={user?.name} size={96} />
      <Text variant="titleMedium">{user?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 8,
  },
});
