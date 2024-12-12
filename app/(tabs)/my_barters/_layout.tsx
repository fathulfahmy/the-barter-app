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
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default MyBartersLayout;
