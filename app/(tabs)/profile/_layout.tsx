import React from "react";

import { Stack } from "expo-router";

import { useAppTheme } from "@/lib/react-native-paper";

const ProfileLayout = () => {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        title: "Profile",
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        headerBackButtonDisplayMode: "minimal",
      }}
    />
  );
};

export default ProfileLayout;
