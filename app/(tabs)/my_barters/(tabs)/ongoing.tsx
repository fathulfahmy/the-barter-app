import React from "react";

import { ScreenWrapper } from "@/components/screens";
import { OngoingTransactions } from "@/features/transaction/components/ongoing-transactions";

const OngoingBarterTransactionsScreen = () => {
  return (
    <ScreenWrapper>
      <OngoingTransactions />
    </ScreenWrapper>
  );
};

export default OngoingBarterTransactionsScreen;
