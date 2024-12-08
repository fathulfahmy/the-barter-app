import { Text } from "react-native-paper";

import { ScreenWrapper } from "./screen-wrapper";

export const EmptyStateScreen = () => {
  return (
    <ScreenWrapper contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
      <Text variant="bodyMedium">No Results Found</Text>
    </ScreenWrapper>
  );
};
