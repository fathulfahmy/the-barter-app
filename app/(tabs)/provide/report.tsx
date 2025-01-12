import React from "react";

import { useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { CreateReport } from "@/features/report/components/create-report";
import { ReportModelName } from "@/types/api";

const ProvideReportCreateScreen = () => {
  const { model_id, model_name } = useLocalSearchParams<{ model_id: string; model_name: ReportModelName }>();

  return (
    <ScreenWrapper>
      <CreateReport model_id={model_id} model_name={model_name} />
    </ScreenWrapper>
  );
};

export default ProvideReportCreateScreen;
