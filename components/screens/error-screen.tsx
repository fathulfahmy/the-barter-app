import { Text } from "react-native-paper";

import { ScreenWrapper } from "./screen-wrapper";

export default function ErrorScreen() {
  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text variant="bodyLarge">Error</Text>
    </ScreenWrapper>
  );
}
