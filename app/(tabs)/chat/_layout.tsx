import { Stack } from "expo-router";

import { useAppTheme } from "@/lib/react-native-paper";

export default function ChatLayout() {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        title: "Chat",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[user_id]" />
    </Stack>
  );
}
