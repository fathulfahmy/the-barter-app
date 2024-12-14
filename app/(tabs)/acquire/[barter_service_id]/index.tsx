import React from "react";
import { View } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { GroupedButtons } from "@/components/ui/button";
import { Service } from "@/features/service/components/barter-service";

const AcquireDetailScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();
  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        <Service barter_service_id={barter_service_id} />
      </View>

      <GroupedButtons
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
