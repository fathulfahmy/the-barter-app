import { Button, Text } from "react-native-paper";

import { Stack, router } from "expo-router";

import { ScreenWrapper } from "@/components/screens";

const NotFoundStateScreen = () => {
  return (
    <ScreenWrapper contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen options={{ title: "Oops" }} />
      <Text variant="bodyLarge">Not Found</Text>
      <Button mode="contained" onPress={() => router.push("/_sitemap")}>
        Sitemap
      </Button>
    </ScreenWrapper>
  );
};

export default NotFoundStateScreen;
