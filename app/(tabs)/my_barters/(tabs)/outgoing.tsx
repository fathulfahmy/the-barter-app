import React from "react";

import { ScreenWrapper } from "@/components/screens";
import { OutgoingTransactions } from "@/features/transaction/components/outgoing-transactions";

const OutgoingTransactionsScreen = () => {
  return (
    <ScreenWrapper>
      <OutgoingTransactions />
    </ScreenWrapper>
  );
};

export default OutgoingTransactionsScreen;
