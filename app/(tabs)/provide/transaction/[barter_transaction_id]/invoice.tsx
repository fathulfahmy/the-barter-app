import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { Invoice } from "@/features/invoice/components/invoice";

const ProvideTransactionInvoice = () => {
  const { barter_transaction_id } = useLocalSearchParams<{ barter_transaction_id: string }>();

  return (
    <ScreenWrapper>
      <Invoice barter_transaction_id={barter_transaction_id} />
    </ScreenWrapper>
  );
};

export default ProvideTransactionInvoice;
