import React from "react";

import { ScreenWrapper } from "@/components/screens";
import { IncomingTransactions } from "@/features/transaction/components/incoming-transactions";

const MyBartersIncomingScreen = () => {
  return (
    <ScreenWrapper>
      <IncomingTransactions />
    </ScreenWrapper>
  );
};

export default MyBartersIncomingScreen;
