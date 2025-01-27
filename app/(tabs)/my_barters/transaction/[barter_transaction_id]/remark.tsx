import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { CreateRemark } from "@/features/remark/components/create-remark";

const MyBartersTransactionRemark = () => {
  const { barter_transaction_id } = useLocalSearchParams<{ barter_transaction_id: string }>();

  return (
    <ScreenWrapper>
      <CreateRemark barter_transaction_id={barter_transaction_id} />
    </ScreenWrapper>
  );
};

export default MyBartersTransactionRemark;
