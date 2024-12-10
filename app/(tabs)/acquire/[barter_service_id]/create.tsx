import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { CreateBarterRequest } from "@/features/barter-request/components/create-barter-request";

const AcquireRequestScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  return (
    <ScreenWrapper>
      <CreateBarterRequest barterServiceId={barter_service_id} />
    </ScreenWrapper>
  );
};

export default AcquireRequestScreen;
