import { Button, Text } from "react-native-paper";

import { Link } from "expo-router";

import { ScreenWrapper } from "@/components/screens";

const ChatScreen = () => {
  return (
    <ScreenWrapper>
      <Text variant="bodyMedium">Chat</Text>
      <Link href="/chat/1" asChild>
        <Button mode="contained">Go to Chat Detail</Button>
      </Link>
    </ScreenWrapper>
  );
};

export default ChatScreen;
