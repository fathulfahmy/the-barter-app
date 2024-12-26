import React from "react";
import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";
import { Channel, Thread, useChannelPreviewDisplayName } from "stream-chat-expo";

import { ScreenWrapper } from "@/components/screens";
import { useChat } from "@/lib/chat/chat-store";

const ChatScreen = () => {
  const { channel, thread, setThread } = useChat();
  const displayName = useChannelPreviewDisplayName(channel, 30);

  return (
    <ScreenWrapper>
      <Stack.Screen options={{ title: displayName }} />
      {channel ? (
        <Channel channel={channel} keyboardVerticalOffset={96} thread={thread} threadList={!!thread}>
          <View style={styles.container}>
            <Thread
              onThreadDismount={() => {
                setThread(null);
              }}
            />
          </View>
        </Channel>
      ) : null}
    </ScreenWrapper>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
