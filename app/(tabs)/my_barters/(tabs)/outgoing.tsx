import React from "react";

import { ScreenWrapper } from "@/components/screens";
import { OutgoingTransactions } from "@/features/transaction/components/outgoing-transactions";

const MyBartersOutgoingScreen = () => {
  return (
    <ScreenWrapper>
      <OutgoingTransactions />
    </ScreenWrapper>
  );
};

export default MyBartersOutgoingScreen;
