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
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="create" />
      <Stack.Screen name="[barter_service_id]/edit" />
      <Stack.Screen name="[barter_service_id]/(tabs)" />
      <Stack.Screen name="transaction/[barter_transaction_id]/payment" />
      <Stack.Screen name="transaction/[barter_transaction_id]/review" />
      <Stack.Screen name="transaction/[barter_transaction_id]/invoice" />
    </Stack>
  );
};

export default ProvideLayout;
