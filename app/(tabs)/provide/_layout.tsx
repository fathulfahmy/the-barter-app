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
      <Stack.Screen name="[barter_service_id]" />
    </Stack>
  );
};

export default ProvideLayout;
