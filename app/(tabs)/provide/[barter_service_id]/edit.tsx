import React from "react";

import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { UpdateService } from "@/features/service/components/update-service";

const ProvideEditScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  return (
    <ScreenWrapper>
      <UpdateService barter_service_id={barter_service_id} />
    </ScreenWrapper>
  );
};

export default ProvideEditScreen;
