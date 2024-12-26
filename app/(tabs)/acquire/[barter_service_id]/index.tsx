import React, { useCallback } from "react";

import { router, useLocalSearchParams } from "expo-router";

import { LoadingStateScreen, ScreenWrapper } from "@/components/screens";
import { Buttons } from "@/components/ui/button";
import { useService } from "@/features/service/api/get-service";
import { Service } from "@/features/service/components/barter-service";
import { useUser } from "@/lib/auth/auth";
import { useChat } from "@/lib/chat/chat-store";
import { client } from "@/lib/chat/client";

const AcquireDetailScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  const userQuery = useUser();
  const serviceQuery = useService({ barter_service_id });

  const user = userQuery.data;
  const service = serviceQuery.data?.data;

  const { setChannel } = useChat();

  const handleChat = useCallback(async () => {
    if (!user?.id || !service?.barter_provider_id) return;

    const channel = client.channel("messaging", {
      members: [user.id, service.barter_provider_id],
    });
    await channel.create();

    setChannel(channel);
    router.replace(`/chat/${channel.cid}`);
  }, [user?.id, service?.barter_provider_id, setChannel]);

  if (userQuery.isLoading || serviceQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <ScreenWrapper>
      <Service barter_service_id={barter_service_id} />

      <Buttons
        variant="bottom"
        buttons={[
          { label: "Chat", mode: "outlined", onPress: handleChat },
          { label: "Request", mode: "contained", onPress: () => router.push(`/acquire/${barter_service_id}/request`) },
        ]}
      />
    </ScreenWrapper>
  );
};

export default AcquireDetailScreen;
