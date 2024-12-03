import { Button, Text } from "react-native-paper";

import { Link, Stack } from "expo-router";

import { ScreenWrapper } from "@/components/screens/screen-wrapper";

export default function NotFoundScreen() {
  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen options={{ title: "Oops" }} />
      <Text variant="bodyLarge">Not Found</Text>
      <Link href="/_sitemap">
        <Button>Sitemap</Button>
      </Link>
    </ScreenWrapper>
  );
}
