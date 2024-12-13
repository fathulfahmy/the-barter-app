import React from "react";

import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { Reviews } from "@/features/review/components/reviews";

const AcquireReviewsScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  return (
    <ScreenWrapper>
      <Reviews barter_service_id={barter_service_id} />
    </ScreenWrapper>
  );
};

export default AcquireReviewsScreen;
