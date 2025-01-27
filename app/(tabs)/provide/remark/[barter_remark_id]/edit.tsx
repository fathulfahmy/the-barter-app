import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { UpdateRemark } from "@/features/remark/components/update-remark";

const ProvideRemarkEdit = () => {
  const { barter_remark_id } = useLocalSearchParams<{ barter_remark_id: string }>();

  return (
    <ScreenWrapper>
      <UpdateRemark barter_remark_id={barter_remark_id} />
    </ScreenWrapper>
  );
};

export default ProvideRemarkEdit;
