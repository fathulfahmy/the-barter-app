import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { BarterRequests } from "@/features/barter-request/components/barter-requests";

const ProvideRequestsScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  return (
    <ScreenWrapper>
      <BarterRequests barterServiceId={barter_service_id} />
    </ScreenWrapper>
  );
};

export default ProvideRequestsScreen;
