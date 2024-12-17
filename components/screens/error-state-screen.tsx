import React from "react";
import { Text } from "react-native-paper";

import { ScreenWrapper } from "./screen-wrapper";

export const ErrorStateScreen = () => {
  return (
    <ScreenWrapper style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text variant="bodyMedium">Error</Text>
    </ScreenWrapper>
  );
};
