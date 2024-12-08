import { Button, Text } from "react-native-paper";

import { Link, Stack } from "expo-router";

import { ScreenWrapper } from "@/components/screens";

const NotFoundStateScreen = () => {
  return (
    <ScreenWrapper contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen options={{ title: "Oops" }} />
      <Text variant="bodyLarge">Not Found</Text>
      <Link href="/_sitemap">
        <Button mode="contained">Sitemap</Button>
      </Link>
    </ScreenWrapper>
  );
};

export default NotFoundStateScreen;
