import React from "react";

import { Stack } from "expo-router";

import { useAppTheme } from "@/lib/react-native-paper";
import { useInitialPrefetch } from "@/utils/use-initial-prefetch";

const AcquireLayout = () => {
  useInitialPrefetch();
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        title: "Acquire",
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        headerBackButtonDisplayMode: "minimal",
      }}
    />
  );
};

export default AcquireLayout;
