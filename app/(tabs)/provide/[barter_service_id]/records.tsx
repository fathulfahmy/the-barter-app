import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { BarterRecords } from "@/features/barter-record/components/barter-records";

const ProvideRecordsScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  return (
    <ScreenWrapper>
      <BarterRecords barterServiceId={barter_service_id} />
    </ScreenWrapper>
  );
};

export default ProvideRecordsScreen;
