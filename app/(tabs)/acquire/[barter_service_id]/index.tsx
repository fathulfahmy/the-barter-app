import { View } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { BottomActionButtons } from "@/components/ui/button";
import { BarterService } from "@/features/barter-service/components/barter-service";

const AcquireDetailScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();
  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        <BarterService barterServiceId={barter_service_id} />
      </View>

      <BottomActionButtons
        buttons={[
          { label: "Chat", mode: "outlined", onPress: () => router.push(`/acquire/${barter_service_id}/chat`) },
          { label: "Request", mode: "contained", onPress: () => router.push(`/acquire/${barter_service_id}/create`) },
        ]}
      />
    </ScreenWrapper>
  );
};

export default AcquireDetailScreen;
