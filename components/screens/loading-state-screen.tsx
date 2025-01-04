import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { ScreenWrapper } from "./screen-wrapper";

export const LoadingStateScreen = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <ActivityIndicator size={"large"} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
