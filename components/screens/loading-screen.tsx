import { ActivityIndicator } from "react-native-paper";

import { ScreenWrapper } from "./screen-wrapper";

export default function LoadingScreen() {
  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} />
    </ScreenWrapper>
  );
}
