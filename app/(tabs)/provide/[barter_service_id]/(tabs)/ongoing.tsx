import React from "react";

import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { OngoingTransactions } from "@/features/transaction/components/ongoing-transactions";

const ServiceOngoingTransactionsScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  return (
    <ScreenWrapper>
      <OngoingTransactions barter_service_id={barter_service_id} />
    </ScreenWrapper>
  );
};

export default ServiceOngoingTransactionsScreen;
