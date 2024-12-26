import React from "react";

import { Stack, router } from "expo-router";
import { Channel, MessageInput, MessageList, useChannelPreviewDisplayName } from "stream-chat-expo";

import { ScreenWrapper } from "@/components/screens";
import { useChat } from "@/lib/chat/chat-store";

const ChatScreen = () => {
  const { channel, setThread } = useChat();
  const displayName = useChannelPreviewDisplayName(channel, 30);

  return (
    <ScreenWrapper>
      <Stack.Screen options={{ title: displayName }} />
      {channel ? (
        <Channel channel={channel} keyboardVerticalOffset={96}>
          <MessageList
            onThreadSelect={(thread) => {
              setThread(thread);
              router.push(`/chat/${channel.cid}/thread/${thread?.cid}`);
            }}
          />
          <MessageInput />
        </Channel>
      ) : null}
    </ScreenWrapper>
  );
};

export default ChatScreen;
