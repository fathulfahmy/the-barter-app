import React from "react";

import { ScreenWrapper } from "@/components/screens";
import { OngoingTransactions } from "@/features/transaction/components/ongoing-transactions";

const OngoingTransactionsScreen = () => {
  return (
    <ScreenWrapper>
      <OngoingTransactions />
    </ScreenWrapper>
  );
};

export default OngoingTransactionsScreen;
