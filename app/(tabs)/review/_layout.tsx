import { Stack } from "expo-router";

import { useAppTheme } from "@/lib/react-native-paper";

const ReviewLayout = () => {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        title: "Review",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[review_id]/edit" />
      <Stack.Screen name="[review_id]/invoice" />
      <Stack.Screen name="[review_id]/payment" />
    </Stack>
  );
};

export default ReviewLayout;
