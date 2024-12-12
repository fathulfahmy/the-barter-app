import React from "react";

import { ScreenWrapper } from "@/components/screens";
import { TransactionsHistory } from "@/features/transaction/components/transactions-history";

const HistoryTransactionsScreen = () => {
  return (
    <ScreenWrapper>
      <TransactionsHistory />
    </ScreenWrapper>
  );
};

export default HistoryTransactionsScreen;
