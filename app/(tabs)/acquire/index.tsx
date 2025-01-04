import React from "react";

import { ScreenWrapper } from "@/components/screens";
import { Acquire } from "@/features/service/components/acquire";

const AcquireScreen = () => {
  return (
    <ScreenWrapper>
      {/* TODO: SEARCH - service searchbar */}
      {/* TODO: SEARCH - service filter by category */}
      <Acquire />
    </ScreenWrapper>
  );
};

export default AcquireScreen;
