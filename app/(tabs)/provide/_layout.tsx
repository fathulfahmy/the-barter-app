import { Stack } from "expo-router";

import { useAppTheme } from "@/lib/react-native-paper";

export default function ProvideLayout() {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        title: "Provide",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="create" />
      <Stack.Screen name="[barter_service_id]/request" />
      <Stack.Screen name="[barter_service_id]/record" />
    </Stack>
  );
}
