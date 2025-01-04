import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { CreatePayment } from "@/features/transaction/components/create-payment";

const ProvideTransactionPayment = () => {
  const { barter_transaction_id } = useLocalSearchParams<{ barter_transaction_id: string }>();

  return (
    <ScreenWrapper>
      <CreatePayment barter_transaction_id={barter_transaction_id} />
    </ScreenWrapper>
  );
};

export default ProvideTransactionPayment;
