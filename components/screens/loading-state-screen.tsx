import React from "react";
import { ActivityIndicator } from "react-native-paper";

import { ScreenWrapper } from "./screen-wrapper";

export const LoadingStateScreen = () => {
  return (
    <ScreenWrapper style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} />
    </ScreenWrapper>
  );
};
