import React from "react";

import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { IncomingTransactions } from "@/features/transaction/components/incoming-transactions";

const ProvideIncomingScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  return (
    <ScreenWrapper>
      <IncomingTransactions barter_service_id={barter_service_id} />
    </ScreenWrapper>
  );
};

export default ProvideIncomingScreen;
