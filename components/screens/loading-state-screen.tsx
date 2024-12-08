import { ActivityIndicator } from "react-native-paper";

import { ScreenWrapper } from "./screen-wrapper";

export const LoadingStateScreen = () => {
  return (
    <ScreenWrapper contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} />
    </ScreenWrapper>
  );
};
