import React from "react";
import { StyleSheet, View } from "react-native";

import { Channel, Thread } from "stream-chat-expo";

import { useChat } from "@/lib/stream-chat/chat-store";

import { CustomAttachButton } from "./custom-attach-button";

export const MessageThread = () => {
  /* ======================================== HOOKS */
  const { channel, thread, setThread } = useChat();

  /* ======================================== RETURNS */
  if (!channel || !thread) return null;

  return (
    <Channel
      channel={channel}
      keyboardVerticalOffset={96}
      AttachButton={CustomAttachButton}
      thread={thread}
      threadList={!!thread}
    >
      <View style={styles.container}>
        <Thread
          onThreadDismount={() => {
            setThread(null);
          }}
        />
      </View>
    </Channel>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
