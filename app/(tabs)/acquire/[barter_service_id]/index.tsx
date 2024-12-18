import React from "react";

import { router, useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { Buttons } from "@/components/ui/button";
import { Service } from "@/features/service/components/barter-service";

const AcquireDetailScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  return (
    <ScreenWrapper>
      <Service barter_service_id={barter_service_id} />

      <Buttons
        variant="bottom"
        buttons={[
          { label: "Chat", mode: "outlined", onPress: () => router.push(`/chat/${barter_service_id}`) },
          { label: "Request", mode: "contained", onPress: () => router.push(`/acquire/${barter_service_id}/request`) },
        ]}
      />
    </ScreenWrapper>
  );
};

export default AcquireDetailScreen;
