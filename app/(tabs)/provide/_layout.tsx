import React from "react";

import { Stack } from "expo-router";

import { useAppTheme } from "@/lib/react-native-paper";

const ProvideLayout = () => {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        title: "Provide",
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        headerBackButtonDisplayMode: "minimal",
      }}
    />
  );
};

export default ProvideLayout;
