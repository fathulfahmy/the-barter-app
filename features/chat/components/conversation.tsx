import React from "react";

import { router } from "expo-router";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";

import { useChat } from "@/lib/stream-chat/chat-store";

import { CustomAttachButton } from "./custom-attach-button";

export const Conversation = () => {
  /* ======================================== HOOKS */
  const { channel, setThread } = useChat();

  /* ======================================== RETURNS */
  if (!channel) return null;

  return (
    <Channel channel={channel} keyboardVerticalOffset={90} AttachButton={CustomAttachButton}>
      <MessageList
        onThreadSelect={(thread) => {
          setThread(thread);
          router.push(`/chat/${channel.cid}/thread/${thread?.cid}`);
        }}
      />
      <MessageInput />
    </Channel>
  );
};
