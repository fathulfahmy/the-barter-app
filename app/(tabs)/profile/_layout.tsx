import { Stack } from "expo-router";

import { useAppTheme } from "@/lib/react-native-paper";

const ProfileLayout = () => {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        title: "Profile",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="edit" />
    </Stack>
  );
};

export default ProfileLayout;
