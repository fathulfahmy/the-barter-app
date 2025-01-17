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
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[barter_service_id]/index" />
      <Stack.Screen name="[barter_service_id]/request" />
      <Stack.Screen name="[barter_service_id]/reviews" />
    </Stack>
  );
};

export default AcquireLayout;
