import React from "react";

import { Stack } from "expo-router";
import { useChannelPreviewDisplayName } from "stream-chat-expo";

import { Conversation } from "@/features/chat/components/conversation";
import { useChat } from "@/lib/stream-chat/chat-store";

const ChatScreen = () => {
  const { channel } = useChat();
  const displayName = useChannelPreviewDisplayName(channel, 30);

  return (
    <>
      <Stack.Screen options={{ title: displayName }} />
      <Conversation />
    </>
  );
};

export default ChatScreen;
