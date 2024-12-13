import React from "react";

import { Stack } from "expo-router";

import { useAppTheme } from "@/lib/react-native-paper";

const ChatLayout = () => {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        title: "Chat",

        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[user_id]" />
    </Stack>
  );
};

export default ChatLayout;
