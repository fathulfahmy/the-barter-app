import React, { useMemo } from "react";

import { router } from "expo-router";
import { ChannelSort } from "stream-chat";
import { ChannelList } from "stream-chat-expo";

import { LoadingStateScreen } from "@/components/screens";
import { useUser } from "@/lib/auth/auth";
import { useChat } from "@/lib/stream-chat/chat-store";

const sort: ChannelSort = { last_message_at: -1 };

export const Conversations = () => {
  /* ======================================== HOOKS */
  const { setChannel } = useChat();

  /* ======================================== QUERIES */
  const userQuery = useUser();
  const user = userQuery.data;

  /* ======================================== MEMOS */
  const memoizedFilters = useMemo(
    () => ({
      members: { $in: [user?.id || ""] },
      type: "messaging",
      last_message_at: { $gte: "2020-01-01T00:00:00.00Z" },
    }),
    [user?.id],
  );

  /* ======================================== RETURNS */
  if (userQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <ChannelList
      filters={memoizedFilters}
      sort={sort}
      onSelect={(channel) => {
        setChannel(channel);
        router.push(`/chat/${channel.cid}`);
      }}
    />
  );
};
