import React from "react";

import { router, useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { Buttons } from "@/components/ui/button";
import { useService } from "@/features/service/api/get-service";
import { Service } from "@/features/service/components/service";
import { ServiceSkeleton } from "@/features/service/skeleton/service";
import { useStreamChat } from "@/hooks/use-stream-chat";

const AcquireDetailScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  const channel = useStreamChat();

  const serviceQuery = useService({ barter_service_id });
  const service = serviceQuery.data?.data;

  if (serviceQuery.isLoading || channel.isLoading) {
    return <ServiceSkeleton />;
  }

  return (
    <ScreenWrapper>
      <Service barter_service_id={barter_service_id} />

      <Buttons
        variant="bottom"
        buttons={[
          { label: "Chat", mode: "outlined", onPress: () => channel.createAndRedirect(service?.barter_provider_id) },
          { label: "Request", mode: "contained", onPress: () => router.push(`/acquire/${barter_service_id}/request`) },
        ]}
      />
    </ScreenWrapper>
  );
};

export default AcquireDetailScreen;
