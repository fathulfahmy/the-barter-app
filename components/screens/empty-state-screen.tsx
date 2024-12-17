import React from "react";
import { Text } from "react-native-paper";

import { ScreenWrapper } from "./screen-wrapper";

export const EmptyStateScreen = () => {
  return (
    <ScreenWrapper style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text variant="bodyMedium">No Results Found</Text>
    </ScreenWrapper>
  );
};
