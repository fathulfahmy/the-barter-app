import { Button, Text } from "react-native-paper";

import { Link } from "expo-router";

import { ScreenWrapper } from "@/components/screens/screen-wrapper";

export default function AcquireListScreen() {
  return (
    <ScreenWrapper>
      <Text>Acquire</Text>
      <Link href="/acquire/1" asChild>
        <Button mode="contained">Go to Acquire Detail</Button>
      </Link>
    </ScreenWrapper>
  );
}
