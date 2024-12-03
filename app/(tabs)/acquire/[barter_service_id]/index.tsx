import { Button, Text } from "react-native-paper";

import { Link } from "expo-router";

import { ScreenWrapper } from "@/components/screens/screen-wrapper";

export default function AcquireDetailScreen() {
  return (
    <ScreenWrapper>
      <Text>AcquireDetailScreen</Text>
      <Link href="/acquire/1/chat" asChild>
        <Button mode="contained">Go to Acquire Chat</Button>
      </Link>
      <Link href="/acquire/1/request" asChild>
        <Button mode="contained">Go to Acquire Request</Button>
      </Link>
    </ScreenWrapper>
  );
}
