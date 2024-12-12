import React from "react";

import { ScreenWrapper } from "@/components/screens";
import { IncomingTransactions } from "@/features/transaction/components/incoming-transactions";

const IncomingTransactionsScreen = () => {
  return (
    <ScreenWrapper>
      <IncomingTransactions />
    </ScreenWrapper>
  );
};

export default IncomingTransactionsScreen;
