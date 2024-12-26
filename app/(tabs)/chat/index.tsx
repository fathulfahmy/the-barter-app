import React, { useMemo } from "react";

import { router } from "expo-router";
import { ChannelSort } from "stream-chat";
import { ChannelList } from "stream-chat-expo";

import { LoadingStateScreen, ScreenWrapper } from "@/components/screens";
import { useUser } from "@/lib/auth/auth";
import { useChat } from "@/lib/chat/chat-store";

const sort: ChannelSort = { last_message_at: -1 };

const ChatScreen = () => {
  const { setChannel } = useChat();

  const userQuery = useUser();
  const user = userQuery.data;

  const memoizedFilters = useMemo(
    () => ({
      members: { $in: [user?.id || ""] },
      type: "messaging",
      last_message_at: { $gte: "2020-01-01T00:00:00.00Z" },
    }),
    [user?.id],
  );

  if (userQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <ScreenWrapper>
      <ChannelList
        filters={memoizedFilters}
        sort={sort}
        onSelect={(channel) => {
          setChannel(channel);
          router.push(`/chat/${channel.cid}`);
        }}
      />
    </ScreenWrapper>
  );
};

export default ChatScreen;
