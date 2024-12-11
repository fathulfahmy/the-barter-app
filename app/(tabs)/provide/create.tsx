import { ScreenWrapper } from "@/components/screens";
import { CreateBarterService } from "@/features/barter-service/components/create-barter-service";

const ProvideCreateScreen = () => {
  return (
    <ScreenWrapper>
      <CreateBarterService />
    </ScreenWrapper>
  );
};

export default ProvideCreateScreen;
