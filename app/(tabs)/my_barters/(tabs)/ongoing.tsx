import React from "react";

import { ScreenWrapper } from "@/components/screens";
import { OngoingTransactions } from "@/features/transaction/components/ongoing-transactions";

const MyBartersOngoingScreen = () => {
  return (
    <ScreenWrapper>
      <OngoingTransactions />
    </ScreenWrapper>
  );
};

export default MyBartersOngoingScreen;
