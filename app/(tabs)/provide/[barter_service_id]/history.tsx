import React from "react";

import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { TransactionsHistory } from "@/features/transaction/components/transactions-history";

const ServiceTransactionsHistory = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  return (
    <ScreenWrapper>
      <TransactionsHistory barter_service_id={barter_service_id} />
    </ScreenWrapper>
  );
};

export default ServiceTransactionsHistory;
