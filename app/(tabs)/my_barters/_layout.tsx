import React from "react";

import { Stack } from "expo-router";

import { useAppTheme } from "@/lib/react-native-paper";

const MyBartersLayout = () => {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        title: "My Barters",
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="report" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="transaction/[barter_transaction_id]/payment" />
      <Stack.Screen name="transaction/[barter_transaction_id]/review" />
      <Stack.Screen name="transaction/[barter_transaction_id]/invoice" />
    </Stack>
  );
};

export default MyBartersLayout;
