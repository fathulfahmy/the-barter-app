import React from "react";

import { ScreenWrapper } from "@/components/screens";
import { CreateService } from "@/features/service/components/create-service";

const ProvideCreateScreen = () => {
  return (
    <ScreenWrapper>
      <CreateService />
    </ScreenWrapper>
  );
};

export default ProvideCreateScreen;
