import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { CreateTransaction } from "@/features/transaction/components/create-transaction";

const AcquireRequestScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  return (
    <ScreenWrapper>
      <CreateTransaction barter_service_id={barter_service_id} />
    </ScreenWrapper>
  );
};

export default AcquireRequestScreen;
