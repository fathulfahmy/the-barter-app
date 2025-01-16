import { useCallback } from "react";

import { router } from "expo-router";

import { useNotification } from "@/components/ui/notification";
import { useUser } from "@/lib/auth/auth";
import { useChat } from "@/lib/stream-chat/chat-store";
import { client } from "@/lib/stream-chat/client";

export const useStreamChat = () => {
  const { resetChat, setChannel } = useChat();
  const userQuery = useUser();

  const createAndRedirect = useCallback(
    async (userIds: string | string[] | null | undefined) => {
      const userId = userQuery.data?.id;

      if (!userId) throw new Error("Auth user is required.");
      if (!userIds) throw new Error("Users are required.");

      const normalizedIds = Array.isArray(userIds) ? userIds : [userIds];
      if (normalizedIds.length === 0) throw new Error("Users are required.");

      try {
        resetChat();

        const channel = client.channel("messaging", {
          members: [userId, ...normalizedIds],
        });

        await channel.create();
        setChannel(channel);
        router.push(`/chat/${channel.id}`, { withAnchor: true });
      } catch (e: any) {
        useNotification.getState().setNotification({
          type: "error",
          messages: e.message || e,
        });
      }
    },
    [userQuery.data?.id, resetChat, setChannel],
  );

  return { createAndRedirect, isLoading: userQuery.isLoading };
};
