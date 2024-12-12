import { Button, Text } from "react-native-paper";

import { Stack, router } from "expo-router";

import { ScreenWrapper } from "@/components/screens";

const NotFoundStateScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops" }} />

      <ScreenWrapper contentContainerStyle={{ alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Text variant="bodyLarge">Not Found</Text>
        <Button mode="contained" onPress={() => router.push("/_sitemap")}>
          Sitemap
        </Button>
      </ScreenWrapper>
    </>
  );
};

export default NotFoundStateScreen;
