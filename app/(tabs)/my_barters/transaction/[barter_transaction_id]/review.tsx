import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { CreateReview } from "@/features/review/components/create-review";

const MyBartersTransactionReview = () => {
  const { barter_transaction_id } = useLocalSearchParams<{ barter_transaction_id: string }>();

  return (
    <ScreenWrapper>
      <CreateReview barter_transaction_id={barter_transaction_id} />
    </ScreenWrapper>
  );
};

export default MyBartersTransactionReview;
